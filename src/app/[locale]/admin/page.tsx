'use client';

import { useState, useEffect } from 'react';
import { VisualCalendar } from '@/components/VisualCalendar';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Settings, Save, Lock, Github, CheckCircle2, AlertCircle, Loader2, X, Check } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Closure, ClosureReason, closureReasons, formatDateFr, getClosureIcons } from '@/types/closures';

export default function AdminPage() {
    const [token, setToken] = useState('');
    const [repo, setRepo] = useState(''); // format: owner/repo
    const [closures, setClosures] = useState<Closure[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
    const [showSettings, setShowSettings] = useState(false);
    const [selectedDate, setSelectedDate] = useState<string | null>(null);
    const [selectedReasons, setSelectedReasons] = useState<ClosureReason[]>([]);

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
                // Support both old formats and new format
                if (Array.isArray(data)) {
                    const normalized: Closure[] = data.map((item: any) => {
                        if (typeof item === 'string') {
                            // Very old format: just date string
                            return { date: item, reasons: ['other'] as ClosureReason[] };
                        } else if (item.reason) {
                            // Old format: single reason
                            return { date: item.date, reasons: [item.reason] as ClosureReason[] };
                        } else if (item.reasons) {
                            // New format: array of reasons
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
            // Remove closure
            setClosures(prev => prev.filter(c => c.date !== dateStr));
        } else {
            // Show reason selector
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
            // 1. Get current file data (to get the SHA) - add cache buster
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
                console.error('Response was not JSON:', responseText.substring(0, 100));
                throw new Error('Réponse invalide de GitHub. Réessayez.');
            }

            const sha = fileData.sha;

            if (!sha) {
                console.error('File data received:', JSON.stringify(fileData).substring(0, 200));
                throw new Error(`SHA non trouvé. Type reçu: ${Array.isArray(fileData) ? 'array' : typeof fileData}. Vérifiez le token.`);
            }

            // 2. Update the file - use TextEncoder for proper UTF-8 encoding
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
            console.error('GitHub API Error:', error);
            setMessage({ type: 'error', text: error.message || 'Erreur inconnue' });
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className="min-h-screen bg-zinc-50 pt-28 pb-12 px-4">
            <div className="container mx-auto max-w-2xl">
                <div className="flex items-center justify-between mb-8">
                    <h1 className="text-3xl font-black uppercase italic tracking-tighter">Admin Calendrier</h1>
                    <Button variant="outline" size="icon" onClick={() => setShowSettings(!showSettings)}>
                        <Settings className="w-5 h-5" />
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
                                <label className="text-xs font-bold uppercase text-zinc-500">Token d'accès personnel</label>
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

                {!token || !repo ? (
                    <Alert className="mb-8 border-orange-200 bg-orange-50 text-orange-800">
                        <AlertCircle className="h-4 w-4 text-orange-600" />
                        <AlertTitle>Configuration requise</AlertTitle>
                        <AlertDescription>
                            Cliquez sur l'engrenage pour configurer votre accès GitHub avant de pouvoir modifier le calendrier.
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
                                            // Parse date manually to avoid timezone issues
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
            </div>
        </div>
    );
}
