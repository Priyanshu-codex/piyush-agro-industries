'use client';

import { useState } from 'react';
import { createClient } from '@/supabase/client';
import { Loader2, Upload, X, File as FileIcon } from 'lucide-react';
import Image from 'next/image';

interface ImageUploadProps {
  bucket: string;
  folder?: string;
  value: string;
  onChange: (url: string) => void;
  label?: string;
  className?: string;
}

export function ImageUpload({ bucket, folder = 'misc', value, onChange, label, className = '' }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setError(null);
      setUploading(true);

      const file = e.target.files?.[0];
      if (!file) return;

      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`;
      const filePath = `${folder}/${fileName}`;

      const supabase = createClient();
      
      const { error: uploadError, data } = await supabase.storage
        .from(bucket)
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: urlData } = supabase.storage.from(bucket).getPublicUrl(filePath);
      onChange(urlData.publicUrl);
    } catch (err: any) {
      console.error('Error uploading image:', err);
      setError(err.message || 'Error uploading image');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className={`space-y-2 ${className}`}>
      {label && <label className="block text-sm font-medium text-slate-700">{label}</label>}
      <div className="flex items-center gap-4">
        {value ? (
          <div className="relative w-32 h-32 rounded-xl border border-slate-200 overflow-hidden group">
            <Image src={value} alt="Uploaded preview" fill className="object-cover" unoptimized />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <button 
                type="button" 
                onClick={() => onChange('')} 
                className="p-2 bg-white rounded-full text-red-500 hover:bg-red-50"
              >
                <X size={16} />
              </button>
            </div>
          </div>
        ) : (
          <div className="w-32 h-32 rounded-xl border-2 border-dashed border-slate-300 flex items-center justify-center bg-slate-50 relative hover:bg-slate-100 transition-colors">
            {uploading ? (
              <Loader2 className="animate-spin text-primary w-6 h-6" />
            ) : (
              <div className="flex flex-col items-center text-slate-400">
                <Upload size={24} />
                <span className="text-xs mt-2 font-medium">Upload Image</span>
              </div>
            )}
            <input 
              type="file" 
              accept="image/*" 
              onChange={handleUpload} 
              disabled={uploading} 
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed" 
            />
          </div>
        )}
      </div>
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}

interface MultiImageUploadProps {
  bucket: string;
  folder?: string;
  value: string[];
  onChange: (urls: string[]) => void;
  label?: string;
  className?: string;
}

export function MultiImageUpload({ bucket, folder = 'misc', value, onChange, label, className = '' }: MultiImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setError(null);
      setUploading(true);

      const files = Array.from(e.target.files || []);
      if (files.length === 0) return;

      const supabase = createClient();
      const newUrls: string[] = [];

      for (const file of files) {
        const fileExt = file.name.split('.').pop();
        const fileName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`;
        const filePath = `${folder}/${fileName}`;

        const { error: uploadError } = await supabase.storage.from(bucket).upload(filePath, file);
        if (uploadError) throw uploadError;

        const { data: urlData } = supabase.storage.from(bucket).getPublicUrl(filePath);
        newUrls.push(urlData.publicUrl);
      }

      onChange([...(value || []), ...newUrls]);
    } catch (err: any) {
      console.error('Error uploading images:', err);
      setError(err.message || 'Error uploading images');
    } finally {
      setUploading(false);
    }
  };

  const removeImage = (index: number) => {
    const newArr = [...value];
    newArr.splice(index, 1);
    onChange(newArr);
  };

  return (
    <div className={`space-y-2 ${className}`}>
      {label && <label className="block text-sm font-medium text-slate-700">{label}</label>}
      <div className="flex flex-wrap items-center gap-4">
        {value?.map((url, idx) => (
          <div key={idx} className="relative w-24 h-24 rounded-xl border border-slate-200 overflow-hidden group shrink-0">
            <Image src={url} alt="Uploaded preview" fill className="object-cover" unoptimized />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <button 
                type="button" 
                onClick={() => removeImage(idx)} 
                className="p-1.5 bg-white rounded-full text-red-500 hover:bg-red-50"
              >
                <X size={14} />
              </button>
            </div>
          </div>
        ))}

        <div className="w-24 h-24 rounded-xl border-2 border-dashed border-slate-300 flex items-center justify-center bg-slate-50 relative hover:bg-slate-100 transition-colors shrink-0">
          {uploading ? (
            <Loader2 className="animate-spin text-primary w-5 h-5" />
          ) : (
            <div className="flex flex-col items-center text-slate-400">
              <Upload size={20} />
              <span className="text-[10px] mt-1 font-medium">Add More</span>
            </div>
          )}
          <input 
            type="file" 
            accept="image/*" 
            multiple
            onChange={handleUpload} 
            disabled={uploading} 
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed" 
          />
        </div>
      </div>
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}

interface DocumentUploadProps {
  bucket: string;
  folder?: string;
  value: string;
  onChange: (url: string) => void;
  label?: string;
  className?: string;
}

export function DocumentUpload({ bucket, folder = 'docs', value, onChange, label, className = '' }: DocumentUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setError(null);
      setUploading(true);

      const file = e.target.files?.[0];
      if (!file) return;

      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`;
      const filePath = `${folder}/${fileName}`;

      const supabase = createClient();
      
      const { error: uploadError } = await supabase.storage.from(bucket).upload(filePath, file);
      if (uploadError) throw uploadError;

      const { data: urlData } = supabase.storage.from(bucket).getPublicUrl(filePath);
      onChange(urlData.publicUrl);
    } catch (err: any) {
      console.error('Error uploading document:', err);
      setError(err.message || 'Error uploading document');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className={`space-y-2 ${className}`}>
      {label && <label className="block text-sm font-medium text-slate-700">{label}</label>}
      <div className="flex items-center gap-4">
        {value ? (
          <div className="flex items-center gap-3 p-3 border border-slate-200 rounded-xl bg-slate-50 w-full max-w-sm">
            <FileIcon className="text-blue-500 shrink-0" size={24} />
            <a href={value} target="_blank" rel="noreferrer" className="text-sm font-medium text-blue-600 truncate hover:underline">
              {value.split('/').pop()}
            </a>
            <button 
              type="button" 
              onClick={() => onChange('')} 
              className="ml-auto p-1.5 text-slate-400 hover:text-red-500 hover:bg-slate-200 rounded-lg transition-colors shrink-0"
            >
              <X size={16} />
            </button>
          </div>
        ) : (
          <div className="w-full max-w-sm h-16 rounded-xl border-2 border-dashed border-slate-300 flex items-center justify-center bg-slate-50 relative hover:bg-slate-100 transition-colors">
            {uploading ? (
              <Loader2 className="animate-spin text-primary w-5 h-5" />
            ) : (
              <div className="flex items-center gap-2 text-slate-500">
                <Upload size={18} />
                <span className="text-sm font-medium">Select PDF Document</span>
              </div>
            )}
            <input 
              type="file" 
              accept=".pdf,.doc,.docx" 
              onChange={handleUpload} 
              disabled={uploading} 
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed" 
            />
          </div>
        )}
      </div>
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}
