"use client";

import { ProjectForm } from "@/modules/home/ui/components/project-form";
import Image from "next/image";
import { useState, useEffect } from "react";
import { ProjectsList } from "@/modules/home/ui/components/projects-list";

const Page = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="flex flex-col max-w-6xl mx-auto w-full relative px-6">
      <section className="flex flex-col items-center justify-center min-h-[60vh] py-24 lg:py-36 space-y-10">
        {/* Logo with glow effect */}
        <div className={`relative transition-all duration-1000 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <div className="absolute inset-0 blur-2xl bg-gradient-to-r from-blue-500/30 to-purple-500/30 rounded-full animate-pulse" />
          <Image 
            src="/Logo.svg" 
            alt="Setn" 
            width={80} 
            height={80} 
            className="relative z-10 drop-shadow-2xl"
          />
        </div>

        {/* Main heading with gradient text */}
        <div className={`space-y-6 text-center transition-all duration-1000 delay-100 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight">
            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 dark:from-blue-400 dark:via-indigo-400 dark:to-purple-400 bg-clip-text text-transparent">
              Build something amazing
            </span>
            <br />
            <span className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-slate-800 dark:text-slate-200">
              with Setn.ai
            </span>
          </h1>
          
          {/* Animated subtitle */}
          <p className="text-lg md:text-xl lg:text-2xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Create powerful apps and stunning websites by chatting with our
            <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-500"> AI-powered assistant</span>
          </p>
        </div>

        {/* Feature badges */}
        <div className={`flex flex-wrap justify-center gap-4 pt-6 transition-all duration-1000 delay-200 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <div className="px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800">
            <span className="text-sm font-medium text-blue-700 dark:text-blue-300">🚀 Lightning Fast</span>
          </div>
          <div className="px-4 py-2 rounded-full bg-purple-100 dark:bg-purple-900/30 border border-purple-200 dark:border-purple-800">
            <span className="text-sm font-medium text-purple-700 dark:text-purple-300">🎨 Beautiful Design</span>
          </div>
          <div className="px-4 py-2 rounded-full bg-green-100 dark:bg-green-900/30 border border-green-200 dark:border-green-800">
            <span className="text-sm font-medium text-green-700 dark:text-green-300">✨ AI Powered</span>
          </div>
        </div>
      </section>
       <ProjectsList />  

      {/* Form section with glass effect */}
      <div className={`max-w-3xl mx-auto w-full transition-all duration-1000 delay-300 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        <div className="relative">
          {/* Glow effect behind form */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 blur-3xl -z-10" />
          
          {/* Glass card wrapper */}
          <div className="backdrop-blur-sm bg-white/50 dark:bg-slate-900/50 rounded-2xl border border-white/20 dark:border-slate-800/50 shadow-2xl p-3">
            <ProjectForm />
          </div>
        </div>

        {/* Floating hint text */}
        <p className="text-center text-sm text-slate-500 dark:text-slate-400 mt-8 mb-12 animate-pulse">
          Start building your dream project today ✨
        </p>
      </div>
    </div>
  );
};

export default Page;