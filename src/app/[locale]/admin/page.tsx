'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { VisualCalendar } from '@/components/VisualCalendar';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Settings, Save, Lock, Github, CheckCircle2, AlertCircle, Loader2, X, Check, ScanLine, CalendarDays, Ticket } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Closure, ClosureReason, closureReasons, formatDateFr, getClosureIcons } from '@/types/closures';

interface TicketData {
    id: string;
    season: string;
    price: number;
    customerName: string;
    customerEmail: string;
    createdAt: string;
    validUntil: string;
    status: 'active' | 'used' | 'expired';
    usedAt?: string;
}

interface ScanResult {
    valid: boolean;
    message: string;
    ticket?: TicketData;
}

export default function AdminPage() {
    const [token, setToken] = useState('');
    const [repo, setRepo] = useState('');
    const [closures, setClosures] = useState<Closure[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
    const [showSettings, setShowSettings] = useState(false);
    const [selectedDate, setSelectedDate] = useState<string | null>(null);
    const [selectedReasons, setSelectedReasons] = useState<ClosureReason[]>([]);

    // Scanner state
    const [activeTab, setActiveTab] = useState<'calendar' | 'scanner'>('calendar');
    const [scanResult, setScanResult] = useState<ScanResult | null>(null);
    const [isScanning, setIsScanning] = useState(false);
    const [isValidating, setIsValidating] = useState(false);
    const [manualId, setManualId] = useState('');
    const [cameraError, setCameraError] = useState<string | null>(null);
    const scannerRef = useRef<any>(null);
    const isInitializing = useRef(false);

    // Initialize from localStorage
    useEffect(() => {
        const savedToken = localStorage.getItem('gh_token') || '';
        const savedRepo = localStorage.getItem('gh_repo') || '';
        setToken(savedToken);
        setRepo(savedRepo);

        if (savedToken && savedRepo) {
            loadClosures(savedToken, savedRepo);
        }
    }, []);

    // Cleanup scanner on unmount or tab switch
    useEffect(() => {
        return () => { stopScanner(); };
    }, [activeTab]);

    const loadClosures = async (tk: string, rp: string) => {
        setIsLoading(true);
        setMessage(null);
        try {
            if (!tk || !rp) {
                setMessage({ type: 'error', text: 'Token et dépôt requis. Cliquez sur ⚙️ pour configurer.' });
                return;
            }
            const response = await fetch(`https://api.github.com/repos/${rp}/contents/public/data/custom-closures.json`, {
                headers: {
                    Authorization: `token ${tk}`,
                    Accept: 'application/vnd.github.v3.raw',
                },
            });
            if (response.ok) {
                const data = await response.json();
                if (Array.isArray(data)) {
                    const normalized: Closure[] = data.map((item: any) => {
                        if (typeof item === 'string') {
                            return { date: item, reasons: ['other'] as ClosureReason[] };
                        } else if (item.reason) {
                            return { date: item.date, reasons: [item.reason] as ClosureReason[] };
                        } else if (item.reasons) {
                            return item as Closure;
                        }
                        return { date: item.date || item, reasons: ['other'] as ClosureReason[] };
                    });
                    setClosures(normalized);
                }
                setMessage({ type: 'success', text: 'Calendrier chargé avec succès.' });
            } else if (response.status === 401) {
                setMessage({ type: 'error', text: 'Token invalide. Vérifiez votre token GitHub.' });
            } else if (response.status === 404) {
                setMessage({ type: 'error', text: 'Dépôt non trouvé. Vérifiez: ' + rp });
            } else {
                setMessage({ type: 'error', text: `Erreur ${response.status}: ${response.statusText}` });
            }
        } catch (error: any) {
            console.error('Failed to load closures', error);
            setMessage({ type: 'error', text: 'Erreur réseau. Vérifiez votre connexion et la configuration.' });
        } finally {
            setIsLoading(false);
        }
    };

    const handleSaveSettings = () => {
        localStorage.setItem('gh_token', token);
        localStorage.setItem('gh_repo', repo);
        setShowSettings(false);
        loadClosures(token, repo);
    };

    const handleDateClick = (dateStr: string) => {
        const existingClosure = closures.find(c => c.date === dateStr);
        if (existingClosure) {
            setClosures(prev => prev.filter(c => c.date !== dateStr));
        } else {
            setSelectedDate(dateStr);
            setSelectedReasons([]);
        }
    };

    const toggleReason = (reason: ClosureReason) => {
        setSelectedReasons(prev =>
            prev.includes(reason)
                ? prev.filter(r => r !== reason)
                : [...prev, reason]
        );
    };

    const handleConfirmReasons = () => {
        if (selectedDate && selectedReasons.length > 0) {
            setClosures(prev => [...prev, { date: selectedDate, reasons: selectedReasons }]);
            setSelectedDate(null);
            setSelectedReasons([]);
        }
    };

    const handlePublish = async () => {
        if (!token || !repo) {
            setMessage({ type: 'error', text: 'Veuillez configurer le token et le dépôt.' });
            return;
        }

        setIsSaving(true);
        setMessage(null);

        try {
            const timestamp = Date.now();
            const getRes = await fetch(`https://api.github.com/repos/${repo}/contents/public/data/custom-closures.json?ref=main&_=${timestamp}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Accept': 'application/json',
                    'X-GitHub-Api-Version': '2022-11-28'
                },
                cache: 'no-store'
            });

            if (!getRes.ok) {
                const errorText = await getRes.text();
                if (getRes.status === 401) {
                    throw new Error('Token invalide ou expiré. Vérifiez votre token GitHub.');
                } else if (getRes.status === 404) {
                    throw new Error('Dépôt ou fichier non trouvé. Vérifiez le nom du dépôt.');
                } else {
                    throw new Error(`Erreur GitHub (${getRes.status}): ${errorText}`);
                }
            }

            const responseText = await getRes.text();
            let fileData;
            try {
                fileData = JSON.parse(responseText);
            } catch {
                throw new Error('Réponse invalide de GitHub. Réessayez.');
            }

            const sha = fileData.sha;

            if (!sha) {
                throw new Error(`SHA non trouvé. Vérifiez le token.`);
            }

            const jsonContent = JSON.stringify(closures, null, 2);
            const base64Content = btoa(unescape(encodeURIComponent(jsonContent)));

            const putRes = await fetch(`https://api.github.com/repos/${repo}/contents/public/data/custom-closures.json`, {
                method: 'PUT',
                headers: {
                    Authorization: `token ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    message: `Mise a jour du calendrier (${closures.length} jours fermes)`,
                    content: base64Content,
                    sha: sha,
                }),
            });

            if (putRes.ok) {
                setMessage({ type: 'success', text: 'Calendrier mis à jour ! Le site va être redéployé d\'ici quelques minutes.' });
            } else {
                const errorData = await putRes.json().catch(() => ({}));
                throw new Error(`Erreur de mise à jour (${putRes.status}): ${errorData.message || putRes.statusText}`);
            }
        } catch (error: any) {
            setMessage({ type: 'error', text: error.message || 'Erreur inconnue' });
        } finally {
            setIsSaving(false);
        }
    };

    // === SCANNER FUNCTIONS ===
    const checkTicket = useCallback(async (ticketId: string) => {
        try {
            const response = await fetch(`/api/tickets/validate?ticketId=${encodeURIComponent(ticketId)}`);
            const data = await response.json();
            setScanResult(data);
        } catch (error) {
            console.error('Error checking ticket:', error);
            setScanResult({ valid: false, message: 'Erreur de connexion' });
        }
    }, []);

    const stopScanner = useCallback(async () => {
        if (scannerRef.current) {
            try {
                await scannerRef.current.stop();
            } catch (e) {
                console.log('Scanner already stopped', e);
            }
            scannerRef.current = null;
        }
    }, []);

    const startScanner = useCallback(async () => {
        if (isInitializing.current) return;
        isInitializing.current = true;
        setCameraError(null);

        try {
            await stopScanner();

            const { Html5Qrcode } = await import('html5-qrcode');
            const html5QrCode = new Html5Qrcode('qr-reader');
            scannerRef.current = html5QrCode;

            await html5QrCode.start(
                { facingMode: 'environment' },
                {
                    fps: 10,
                    qrbox: { width: 250, height: 250 },
                },
                async (decodedText: string) => {
                    await stopScanner();
                    setIsScanning(false);
                    await checkTicket(decodedText);
                },
                () => { }
            );
        } catch (err) {
            console.error('Camera error:', err);
            setCameraError('Impossible d\'accéder à la caméra. Utilisez la saisie manuelle.');
            setIsScanning(false);
        } finally {
            isInitializing.current = false;
        }
    }, [checkTicket, stopScanner]);

    useEffect(() => {
        if (activeTab === 'scanner' && isScanning) {
            startScanner();
        }
        return () => { stopScanner(); };
    }, [isScanning, activeTab, startScanner, stopScanner]);

    const handleValidate = async () => {
        if (!scanResult?.ticket) return;
        setIsValidating(true);
        try {
            const response = await fetch('/api/tickets/validate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ticketId: scanResult.ticket.id })
            });
            const data = await response.json();
            setScanResult(data);
        } catch (error) {
            console.error('Error validating ticket:', error);
            alert('Erreur lors de la validation');
        }
        setIsValidating(false);
    };

    const handleManualCheck = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!manualId.trim()) return;
        await checkTicket(manualId.trim().toUpperCase());
        setManualId('');
    };

    const resetScanner = () => {
        setScanResult(null);
        setCameraError(null);
    };

    return (
        <div className="min-h-screen bg-zinc-50 pt-28 pb-12 px-4">
            <div className="container mx-auto max-w-2xl">
                <div className="flex items-center justify-between mb-8">
                    <h1 className="text-3xl font-black uppercase italic tracking-tighter">Administration</h1>
                    <Button variant="outline" size="icon" onClick={() => setShowSettings(!showSettings)}>
                        <Settings className="w-5 h-5" />
                    </Button>
                </div>

                {/* Tab Navigation */}
                <div className="flex gap-2 mb-6">
                    <Button
                        variant={activeTab === 'calendar' ? 'default' : 'outline'}
                        onClick={() => { setActiveTab('calendar'); stopScanner(); setIsScanning(false); }}
                        className="flex-1 gap-2"
                    >
                        <CalendarDays className="w-4 h-4" />
                        Calendrier
                    </Button>
                    <Button
                        variant={activeTab === 'scanner' ? 'default' : 'outline'}
                        onClick={() => setActiveTab('scanner')}
                        className="flex-1 gap-2"
                    >
                        <ScanLine className="w-4 h-4" />
                        Scanner Billets
                    </Button>
                </div>

                {showSettings && (
                    <Card className="mb-8 border-primary/20 shadow-lg">
                        <CardHeader>
                            <CardTitle className="text-sm uppercase tracking-widest flex items-center gap-2">
                                <Github className="w-4 h-4" /> Configuration GitHub
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase text-zinc-500">Dépôt (ex: utilisateur/projet)</label>
                                <Input
                                    value={repo}
                                    onChange={(e) => setRepo(e.target.value)}
                                    placeholder="nom-utilisateur/mon-projet"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase text-zinc-500">Token d&apos;accès personnel</label>
                                <div className="relative">
                                    <Input
                                        type="password"
                                        value={token}
                                        onChange={(e) => setToken(e.target.value)}
                                        placeholder="ghp_xxxxxxxxxxxx"
                                    />
                                    <Lock className="absolute right-3 top-2.5 w-4 h-4 text-zinc-300" />
                                </div>
                            </div>
                            <Button className="w-full" onClick={handleSaveSettings}>Sauvegarder la config</Button>
                        </CardContent>
                    </Card>
                )}

                {/* Reason Selector Modal */}
                {selectedDate && (
                    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[9999] flex items-center justify-center p-4">
                        <Card className="w-full max-w-sm shadow-2xl">
                            <CardHeader className="pb-2">
                                <div className="flex items-center justify-between">
                                    <CardTitle className="text-lg font-bold">Raisons de fermeture</CardTitle>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => setSelectedDate(null)}
                                        className="min-h-[44px] min-w-[44px] rounded-full hover:bg-zinc-100"
                                    >
                                        <X className="w-5 h-5" />
                                    </Button>
                                </div>
                                <CardDescription>
                                    Fermeture du {formatDateFr(selectedDate)}
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-2">
                                <p className="text-sm text-muted-foreground mb-3">Sélectionnez une ou plusieurs raisons :</p>
                                {(Object.entries(closureReasons) as [ClosureReason, typeof closureReasons[ClosureReason]][]).map(([key, value]) => {
                                    const isSelected = selectedReasons.includes(key);
                                    return (
                                        <Button
                                            key={key}
                                            variant={isSelected ? "default" : "outline"}
                                            className={`w-full justify-start gap-4 h-14 text-lg ${isSelected ? 'bg-primary text-primary-foreground' : ''}`}
                                            onClick={() => toggleReason(key)}
                                        >
                                            <span className="text-3xl">{value.icon}</span>
                                            <span className="font-semibold flex-1 text-left">{value.labelFr}</span>
                                            {isSelected && <Check className="w-5 h-5" />}
                                        </Button>
                                    );
                                })}
                                <Button
                                    className="w-full h-12 mt-4 font-bold"
                                    onClick={handleConfirmReasons}
                                    disabled={selectedReasons.length === 0}
                                >
                                    Confirmer ({selectedReasons.length} raison{selectedReasons.length > 1 ? 's' : ''})
                                </Button>
                            </CardContent>
                        </Card>
                    </div>
                )}

                {/* ===== CALENDAR TAB ===== */}
                {activeTab === 'calendar' && (
                    <>
                        {!token || !repo ? (
                            <Alert className="mb-8 border-orange-200 bg-orange-50 text-orange-800">
                                <AlertCircle className="h-4 w-4 text-orange-600" />
                                <AlertTitle>Configuration requise</AlertTitle>
                                <AlertDescription>
                                    Cliquez sur l&apos;engrenage pour configurer votre accès GitHub avant de pouvoir modifier le calendrier.
                                </AlertDescription>
                            </Alert>
                        ) : (
                            <div className="space-y-6">
                                {message && (
                                    <Alert className={message.type === 'success' ? 'border-green-200 bg-green-50 text-green-800' : 'border-red-200 bg-red-50 text-red-800'}>
                                        {message.type === 'success' ? <CheckCircle2 className="h-4 w-4" /> : <AlertCircle className="h-4 w-4" />}
                                        <AlertTitle>{message.type === 'success' ? 'Succès' : 'Erreur'}</AlertTitle>
                                        <AlertDescription>{message.text}</AlertDescription>
                                    </Alert>
                                )}

                                <Card className="overflow-hidden border-none shadow-xl bg-white">
                                    <div className="bg-primary p-4 text-white flex justify-between items-center">
                                        <p className="text-sm font-bold uppercase italic">Gestion des fermetures</p>
                                        {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
                                    </div>
                                    <CardContent className="p-0">
                                        <VisualCalendar
                                            className="border-none shadow-none"
                                            customClosures={closures}
                                            onDateClick={handleDateClick}
                                        />
                                    </CardContent>
                                    <div className="p-4 bg-zinc-50 border-t flex flex-col gap-3">
                                        <div className="text-sm text-zinc-500 font-medium">
                                            <strong>{closures.length}</strong> jours marqués comme fermés exceptionnellement.
                                        </div>
                                        {closures.length > 0 && (
                                            <div className="flex flex-wrap gap-2">
                                                {closures.slice(0, 5).map(c => {
                                                    const [year, month, day] = c.date.split('-').map(Number);
                                                    const months = ['janv.', 'févr.', 'mars', 'avr.', 'mai', 'juin', 'juil.', 'août', 'sept.', 'oct.', 'nov.', 'déc.'];
                                                    const dateDisplay = `${day} ${months[month - 1]}`;
                                                    return (
                                                        <span key={c.date} className="inline-flex items-center gap-1 text-xs bg-red-100 text-red-700 px-2 py-1 rounded-full">
                                                            <span className="text-base">{getClosureIcons(c.reasons)}</span> {dateDisplay}
                                                        </span>
                                                    );
                                                })}
                                                {closures.length > 5 && (
                                                    <span className="text-xs text-zinc-400">+{closures.length - 5} autres</span>
                                                )}
                                            </div>
                                        )}
                                        <Button
                                            className="w-full h-12 text-lg font-black uppercase italic tracking-tighter"
                                            onClick={handlePublish}
                                            disabled={isSaving}
                                        >
                                            {isSaving ? (
                                                <><Loader2 className="w-5 h-5 mr-2 animate-spin" /> Publication...</>
                                            ) : (
                                                <><Save className="w-5 h-5 mr-2" /> Publier les changements</>
                                            )}
                                        </Button>
                                    </div>
                                </Card>

                                <div className="p-6 bg-zinc-100 rounded-2xl">
                                    <h3 className="text-sm font-black uppercase italic mb-2 tracking-tight">Instructions Mobile</h3>
                                    <ul className="text-xs text-zinc-500 space-y-2 list-disc pl-4">
                                        <li>Touchez un jour <strong>vert</strong> pour le marquer comme fermé et choisir les raisons.</li>
                                        <li>Touchez un jour <strong>rouge</strong> pour le remettre ouvert.</li>
                                        <li>Une fois fini, cliquez sur <strong>Publier</strong> pour mettre le site à jour.</li>
                                    </ul>
                                </div>
                            </div>
                        )}
                    </>
                )}

                {/* ===== SCANNER TAB ===== */}
                {activeTab === 'scanner' && (
                    <div className="space-y-6">
                        <Card className="overflow-hidden border-none shadow-xl bg-white">
                            <div className="bg-primary p-4 text-white">
                                <div className="flex items-center gap-2">
                                    <Ticket className="w-5 h-5" />
                                    <p className="text-sm font-bold uppercase italic">Scanner de Billets</p>
                                </div>
                            </div>
                            <CardContent className="p-6 space-y-6">
                                {/* Manual Entry */}
                                <form onSubmit={handleManualCheck} className="flex gap-2">
                                    <Input
                                        type="text"
                                        value={manualId}
                                        onChange={(e) => setManualId(e.target.value)}
                                        placeholder="ID du billet (TKT-XXXXXXXX)"
                                        className="flex-1"
                                    />
                                    <Button type="submit" className="px-6 font-bold">
                                        Vérifier
                                    </Button>
                                </form>

                                {/* QR Scanner */}
                                {!scanResult && (
                                    <div className="space-y-4">
                                        {!isScanning ? (
                                            <Button
                                                onClick={() => setIsScanning(true)}
                                                variant="outline"
                                                className="w-full h-24 border-dashed border-2 text-lg gap-3"
                                            >
                                                <ScanLine className="w-6 h-6" />
                                                Démarrer la caméra
                                            </Button>
                                        ) : (
                                            <>
                                                <div id="qr-reader" className="rounded-xl overflow-hidden" style={{ width: '100%' }}></div>
                                                <p className="text-sm text-center text-muted-foreground">Placez le QR code devant la caméra</p>
                                                <Button
                                                    onClick={() => { stopScanner(); setIsScanning(false); }}
                                                    variant="outline"
                                                    className="w-full"
                                                >
                                                    <X className="w-4 h-4 mr-2" /> Arrêter la caméra
                                                </Button>
                                            </>
                                        )}
                                        {cameraError && (
                                            <div className="bg-amber-50 border border-amber-200 text-amber-700 rounded-xl p-3 text-sm">
                                                ⚠️ {cameraError}
                                            </div>
                                        )}
                                    </div>
                                )}

                                {/* Scan Result */}
                                {scanResult && (
                                    <div className={`rounded-2xl p-6 ${scanResult.valid ? 'bg-green-50 border-2 border-green-200' : 'bg-red-50 border-2 border-red-200'}`}>
                                        <div className="text-center mb-4">
                                            <div className="text-5xl mb-2">
                                                {scanResult.valid ? '✅' : '❌'}
                                            </div>
                                            <h2 className={`text-lg font-bold ${scanResult.valid ? 'text-green-700' : 'text-red-700'}`}>
                                                {scanResult.message}
                                            </h2>
                                        </div>

                                        {scanResult.ticket && (
                                            <div className="space-y-2 mb-4">
                                                <div className="flex justify-between text-sm py-2 border-b border-black/10">
                                                    <span className="text-muted-foreground">Référence</span>
                                                    <strong className="font-mono">{scanResult.ticket.id}</strong>
                                                </div>
                                                <div className="flex justify-between text-sm py-2 border-b border-black/10">
                                                    <span className="text-muted-foreground">Saison</span>
                                                    <strong>{scanResult.ticket.season === 'winter' ? '❄️ Hiver' : '☀️ Été'}</strong>
                                                </div>
                                                <div className="flex justify-between text-sm py-2 border-b border-black/10">
                                                    <span className="text-muted-foreground">Client</span>
                                                    <strong>{scanResult.ticket.customerName}</strong>
                                                </div>
                                                <div className="flex justify-between text-sm py-2 border-b border-black/10">
                                                    <span className="text-muted-foreground">Prix</span>
                                                    <strong>{scanResult.ticket.price} €</strong>
                                                </div>
                                                <div className="flex justify-between text-sm py-2 border-b border-black/10">
                                                    <span className="text-muted-foreground">Statut</span>
                                                    <strong>
                                                        {scanResult.ticket.status === 'active' ? '✅ Actif' :
                                                            scanResult.ticket.status === 'used' ? '⚠️ Utilisé' : '❌ Expiré'}
                                                    </strong>
                                                </div>
                                                {scanResult.ticket.usedAt && (
                                                    <div className="flex justify-between text-sm py-2">
                                                        <span className="text-muted-foreground">Utilisé le</span>
                                                        <strong>{new Date(scanResult.ticket.usedAt).toLocaleString('fr-FR')}</strong>
                                                    </div>
                                                )}
                                            </div>
                                        )}

                                        <div className="flex flex-col gap-2">
                                            {scanResult.valid && scanResult.ticket?.status === 'active' && (
                                                <Button
                                                    onClick={handleValidate}
                                                    disabled={isValidating}
                                                    className="w-full h-14 text-lg font-bold bg-green-600 hover:bg-green-700"
                                                >
                                                    {isValidating ? (
                                                        <><Loader2 className="w-5 h-5 mr-2 animate-spin" /> Validation...</>
                                                    ) : (
                                                        <><Check className="w-5 h-5 mr-2" /> Valider ce billet</>
                                                    )}
                                                </Button>
                                            )}
                                            <Button
                                                onClick={resetScanner}
                                                variant="outline"
                                                className="w-full"
                                            >
                                                🔄 Nouveau scan
                                            </Button>
                                        </div>
                                    </div>
                                )}
                            </CardContent>
                        </Card>

                        <div className="p-6 bg-zinc-100 rounded-2xl">
                            <h3 className="text-sm font-black uppercase italic mb-2 tracking-tight">Instructions Scanner</h3>
                            <ul className="text-xs text-zinc-500 space-y-2 list-disc pl-4">
                                <li>Utilisez la <strong>caméra</strong> pour scanner le QR code du billet ou saisissez l&apos;ID manuellement.</li>
                                <li>Un billet <strong>vert</strong> est valide et peut être validé.</li>
                                <li>Un billet <strong>rouge</strong> a déjà été utilisé ou est expiré.</li>
                                <li>Cliquez sur <strong>Valider ce billet</strong> pour marquer le billet comme utilisé.</li>
                            </ul>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
