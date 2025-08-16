"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, Code2, Zap, Shield, Globe } from "lucide-react";
import { ProjectForm } from "@/modules/home/ui/components/project-form";
import { ProjectsList } from "@/modules/home/ui/components/projects-list";
import { useAuth } from "@/hooks/use-auth";

const Page = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative px-6 lg:px-8">
        <div className="mx-auto max-w-6xl pt-20 pb-32 sm:pt-48 sm:pb-40">
          <div className="text-center">
            {/* Main Headline */}
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
              Build Your Vision
            </h1>
            
            {/* Subheadline */}
            <p className="mt-6 text-lg leading-8 text-muted-foreground max-w-2xl mx-auto">
              The most powerful AI-driven development platform for creating modern web applications with natural language
            </p>
            
            {/* CTA Buttons */}
            <div className="mt-10 flex items-center justify-center gap-x-6">
              {!isAuthenticated ? (
                <>
                  <Link href="/auth/sign-up">
                    <Button size="lg" className="gap-2">
                      Get Started
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="/auth/sign-in">
                    <Button variant="outline" size="lg">
                      Sign In
                    </Button>
                  </Link>
                </>
              ) : (
                <div className="w-full max-w-2xl">
                  <ProjectForm />
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Background decoration */}
        <div className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]">
          <div className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-primary to-muted opacity-20 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]" />
        </div>
      </section>

      {/* Features Grid */}
      <section className="px-6 lg:px-8 py-24 sm:py-32">
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Everything you need
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Powerful features to accelerate your development workflow
            </p>
          </div>
          
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {/* Feature 1 */}
            <div className="border border-border rounded-lg p-8 hover:border-foreground/20 transition-colors">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-md bg-muted">
                  <Code2 className="h-5 w-5" />
                </div>
                <h3 className="font-semibold">Natural Language</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Describe what you want to build in plain English and watch it come to life
              </p>
            </div>
            
            {/* Feature 2 */}
            <div className="border border-border rounded-lg p-8 hover:border-foreground/20 transition-colors">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-md bg-muted">
                  <Zap className="h-5 w-5" />
                </div>
                <h3 className="font-semibold">Lightning Fast</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Generate production-ready code in seconds with our optimized AI models
              </p>
            </div>
            
            {/* Feature 3 */}
            <div className="border border-border rounded-lg p-8 hover:border-foreground/20 transition-colors">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-md bg-muted">
                  <Shield className="h-5 w-5" />
                </div>
                <h3 className="font-semibold">Secure by Default</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Built-in authentication and security best practices from day one
              </p>
            </div>
            
            {/* Feature 4 */}
            <div className="border border-border rounded-lg p-8 hover:border-foreground/20 transition-colors">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-md bg-muted">
                  <Globe className="h-5 w-5" />
                </div>
                <h3 className="font-semibold">Deploy Anywhere</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                One-click deployment to your favorite hosting platforms
              </p>
            </div>
            
            {/* Feature 5 */}
            <div className="border border-border rounded-lg p-8 hover:border-foreground/20 transition-colors">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-md bg-muted">
                  <Code2 className="h-5 w-5" />
                </div>
                <h3 className="font-semibold">Modern Stack</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Built with Next.js, TypeScript, and the latest web technologies
              </p>
            </div>
            
            {/* Feature 6 */}
            <div className="border border-border rounded-lg p-8 hover:border-foreground/20 transition-colors">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-md bg-muted">
                  <Zap className="h-5 w-5" />
                </div>
                <h3 className="font-semibold">Real-time Preview</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                See your changes instantly with hot reload and live preview
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Code Example Section */}
      <section className="px-6 lg:px-8 py-24 border-t border-border">
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto max-w-2xl text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Simple to use
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Get started with just one prompt
            </p>
          </div>
          {/* Website Demo */}
          <div className="mx-auto max-w-3xl">
            <div className="rounded-lg border border-border bg-muted/50 p-6">
              <div className="flex items-center gap-2 mb-4">
                <div className="h-3 w-3 rounded-full bg-red-500" />
                <div className="h-3 w-3 rounded-full bg-yellow-500" />
                <div className="h-3 w-3 rounded-full bg-green-500" />
              </div>
              <pre className="text-sm overflow-x-auto">
                <code className="language-typescript">{`// Start building with natural language
type your prompt = "Create a modern blog with authentication"

// Setn.ai generates everything for you
await setn.generate({
  prompt,
  features: ['auth', 'database', 'api', 'ui'],
  deploy: true
})

// Your app is ready! 🚀`}</code>
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section for Authenticated Users */}
      {isAuthenticated && (
        <section className="px-6 lg:px-8 py-24 border-t border-border">
          <div className="mx-auto max-w-6xl">
            <ProjectsList />
          </div>
        </section>
      )}

      {/* CTA Section */}
      {!isAuthenticated && (
        <section className="px-6 lg:px-8 py-24">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Ready to build?
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Join thousands of developers building with AI
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link href="/sign-up">
                <Button size="lg" className="gap-2">
                  Start Building
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default Page;