"use client";
import { AlertCircle, CheckCircle, X, FileText, Image as ImageIcon, File, DownloadCloud, UploadCloud } from 'lucide-react';


import { useState, useRef, DragEvent, ChangeEvent } from "react";

interface UploadedFile {
    id: string;
    file: File;
    progress: number;
    status: "uploading" | "done" | "error";
}

const ALLOWED_TYPES = ["application/pdf", "image/jpeg", "image/png"];
const MAX_SIZE_MB = 10;

function getFileIcon(type: string) {
    if (type === "application/pdf") return { icon: FileText, color: "text-red-500" };
    if (type.startsWith("image/")) return { icon: ImageIcon, color: "text-primary" };
    return { icon: File, color: "text-slate-500" };
}

function formatSize(bytes: number) {
    return bytes < 1024 * 1024
        ? `${(bytes / 1024).toFixed(1)} KB`
        : `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export default function UploadZone() {
    const [isDragging, setIsDragging] = useState(false);
    const [uploads, setUploads] = useState<UploadedFile[]>([]);
    const [error, setError] = useState<string | null>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    function simulateUpload(id: string) {
        let progress = 0;
        const interval = setInterval(() => {
            progress += Math.floor(Math.random() * 20) + 10;
            if (progress >= 100) {
                progress = 100;
                clearInterval(interval);
                setUploads((prev) =>
                    prev.map((u) => (u.id === id ? { ...u, progress: 100, status: "done" } : u))
                );
            } else {
                setUploads((prev) =>
                    prev.map((u) => (u.id === id ? { ...u, progress } : u))
                );
            }
        }, 300);
    }

    function processFiles(files: FileList | null) {
        if (!files) return;
        setError(null);

        Array.from(files).forEach((file) => {
            if (!ALLOWED_TYPES.includes(file.type)) {
                setError(`Tipo não suportado: ${file.name}. Use PDF, JPG ou PNG.`);
                return;
            }
            if (file.size > MAX_SIZE_MB * 1024 * 1024) {
                setError(`Arquivo muito grande: ${file.name}. Máximo 10MB.`);
                return;
            }
            const id = `${file.name}-${Date.now()}`;
            const newUpload: UploadedFile = { id, file, progress: 0, status: "uploading" };
            setUploads((prev) => [...prev, newUpload]);
            simulateUpload(id);
        });
    }

    function handleDragOver(e: DragEvent<HTMLDivElement>) {
        e.preventDefault();
        setIsDragging(true);
    }

    function handleDragLeave(e: DragEvent<HTMLDivElement>) {
        e.preventDefault();
        setIsDragging(false);
    }

    function handleDrop(e: DragEvent<HTMLDivElement>) {
        e.preventDefault();
        setIsDragging(false);
        processFiles(e.dataTransfer.files);
    }

    function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
        processFiles(e.target.files);
        e.target.value = "";
    }

    function removeUpload(id: string) {
        setUploads((prev) => prev.filter((u) => u.id !== id));
    }

    return (
        <div className="flex flex-col gap-4">
            {/* Drop Zone */}
            <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => inputRef.current?.click()}
                className={`bg-white dark:bg-slate-800 rounded-xl p-8 border-2 border-dashed transition-all cursor-pointer group flex flex-col items-center justify-center text-center gap-4 select-none
          ${isDragging
                        ? "border-primary bg-primary/5 scale-[1.01] shadow-lg shadow-primary/10"
                        : "border-primary/30 hover:border-primary hover:bg-primary/5"
                    }`}
            >
                <input
                    ref={inputRef}
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    multiple
                    className="hidden"
                    onChange={handleInputChange}
                />
                <div className={`p-4 rounded-full transition-colors ${isDragging ? "bg-primary/20" : "bg-primary/5 group-hover:bg-primary/10"}`}>
                    {isDragging ? (
                        <DownloadCloud className={`text-4xl w-10 h-10 text-primary transition-transform duration-200 scale-110`} />
                    ) : (
                        <UploadCloud className={`text-4xl w-10 h-10 text-primary transition-transform duration-200`} />
                    )}
                </div>
                <div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                        {isDragging ? "Solte para fazer upload!" : "Upload de Documentos"}
                    </h3>
                    <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
                        {isDragging
                            ? "Pode soltar o arquivo agora"
                            : <><span>Arraste seus arquivos aqui ou </span><span className="text-primary font-semibold">clique para selecionar</span></>
                        }
                    </p>
                </div>
                <p className="text-xs text-slate-400">Suportamos PDF, JPG, PNG até 10MB</p>
            </div>

            {/* Error Message */}
            {error && (
                <div className="flex items-center gap-2 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-600 dark:text-red-400 text-sm">
                    <AlertCircle className="text-[18px]" />
                    <span className="flex-1">{error}</span>
                    <button onClick={() => setError(null)} className="text-red-400 hover:text-red-600 transition-colors">
                        <X className="text-[16px]" />
                    </button>
                </div>
            )}

            {/* Upload File List */}
            {uploads.length > 0 && (
                <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
                    <div className="p-4 border-b border-slate-100 dark:border-slate-700 flex items-center justify-between">
                        <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                            Arquivos ({uploads.length})
                        </h4>
                        <button
                            onClick={() => setUploads([])}
                            className="text-xs text-slate-400 hover:text-red-500 transition-colors"
                        >
                            Limpar tudo
                        </button>
                    </div>
                    <ul className="divide-y divide-slate-100 dark:divide-slate-800">
                        {uploads.map((u) => {
                            const { icon: Icon, color } = getFileIcon(u.file.type);
                            return (
                                <li key={u.id} className="p-4 flex items-center gap-3">
                                    <Icon className={`text-[22px] w-6 h-6 shrink-0 ${color}`} />
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center justify-between mb-1">
                                            <p className="text-sm font-medium text-slate-900 dark:text-white truncate">{u.file.name}</p>
                                            <span className="text-xs text-slate-400 ml-2 shrink-0">{formatSize(u.file.size)}</span>
                                        </div>
                                        <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-1.5">
                                            <div
                                                className={`h-1.5 rounded-full transition-all duration-300 ${u.status === "done" ? "bg-green-500" : "bg-primary"}`}
                                                style={{ width: `${u.progress}%` }}
                                            />
                                        </div>
                                    </div>
                                    <div className="shrink-0 flex items-center gap-2 ml-2">
                                        {u.status === "done" ? (
                                            <CheckCircle className="text-green-500 text-[20px]" />
                                        ) : (
                                            <span className="text-xs text-primary font-medium w-8 text-right">{u.progress}%</span>
                                        )}
                                        <button
                                            onClick={() => removeUpload(u.id)}
                                            className="text-slate-300 hover:text-red-500 transition-colors"
                                        >
                                            <X className="text-[18px]" />
                                        </button>
                                    </div>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            )}
        </div>
    );
}
