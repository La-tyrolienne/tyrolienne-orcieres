'use client';

import { useState, useEffect } from 'react';
import { VisualCalendar } from '@/components/VisualCalendar';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Settings, Save, Lock, Github, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export default function AdminPage() {
    const [token, setToken] = useState('');
    const [repo, setRepo] = useState(''); // format: owner/repo
    const [closures, setClosures] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
    const [showSettings, setShowSettings] = useState(false);

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
        try {
            const response = await fetch(`https://api.github.com/repos/${rp}/contents/public/data/custom-closures.json`, {
                headers: {
                    Authorization: `token ${tk}`,
                    Accept: 'application/vnd.github.v3.raw',
                },
            });
            if (response.ok) {
                const data = await response.json();
                setClosures(data);
            }
        } catch (error) {
            console.error('Failed to load closures', error);
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

    const handleDateToggle = (dateStr: string) => {
        setClosures(prev =>
            prev.includes(dateStr)
                ? prev.filter(d => d !== dateStr)
                : [...prev, dateStr]
        );
    };

    const handlePublish = async () => {
        if (!token || !repo) {
            setMessage({ type: 'error', text: 'Veuillez configurer le token et le dépôt.' });
            return;
        }

        setIsSaving(true);
        setMessage(null);

        try {
            // 1. Get current file data (to get the SHA)
            const getRes = await fetch(`https://api.github.com/repos/${repo}/contents/public/data/custom-closures.json`, {
                headers: { Authorization: `token ${token}` },
            });

            if (!getRes.ok) throw new Error('Impossible de récupérer le fichier sur GitHub');
            const fileData = await getRes.json();
            const sha = fileData.sha;

            // 2. Update the file
            const putRes = await fetch(`https://api.github.com/repos/${repo}/contents/public/data/custom-closures.json`, {
                method: 'PUT',
                headers: {
                    Authorization: `token ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    message: `📅 Mise à jour du calendrier (${closures.length} jours fermés)`,
                    content: btoa(JSON.stringify(closures, null, 2)),
                    sha: sha,
                }),
            });

            if (putRes.ok) {
                setMessage({ type: 'success', text: 'Calendrier mis à jour ! Le site va être redéployé d\'ici quelques minutes.' });
            } else {
                throw new Error('Erreur lors de la mise à jour sur GitHub');
            }
        } catch (error: any) {
            setMessage({ type: 'error', text: error.message });
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
                                    onDateClick={handleDateToggle}
                                />
                            </CardContent>
                            <div className="p-4 bg-zinc-50 border-t flex flex-col gap-3">
                                <div className="text-sm text-zinc-500 font-medium">
                                    <strong>{closures.length}</strong> jours marqués comme fermés exceptionnellement.
                                </div>
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
                                <li>Touchez un jour pour basculer entre <strong>Ouvert</strong> (Vert) et <strong>Fermé</strong> (Rouge).</li>
                                <li>Le marquage rouge indique une fermeture exceptionnelle (météo, technique).</li>
                                <li>Une fois fini, cliquez sur <strong>Publier</strong> pour mettre le site à jour.</li>
                            </ul>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
