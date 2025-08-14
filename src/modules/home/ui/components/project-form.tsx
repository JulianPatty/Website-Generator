"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import TextareaAutosize from "react-textarea-autosize";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useTRPC } from "@/trpc/client";
import { Form, FormField } from "@/components/ui/form";
import { ArrowRight, Loader2, Sparkles } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { PROJECT_TEMPLATES } from "../../constants";

const formSchema = z.object({
    value: z.string()
        .min(1, { message: "Prompt is required" })
        .max(10000, { message: "Character limit exceeded" }),
});

export const ProjectForm = () => {
    const router = useRouter();
    const trpc = useTRPC();
    const queryClient = useQueryClient();
    const [isFocused, setIsFocused] = useState(false);
    
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            value: "",
        },
    });

    const createProject = useMutation(trpc.projects.create.mutationOptions({
        onSuccess: (data) => {
            queryClient.invalidateQueries(
                trpc.projects.getOne.queryOptions({
                    id: data.id,
                })
            );
            router.push(`/projects/${data.id}`);
        },
        onError: (error) => {
            if (error.data?.code === "UNAUTHORIZED") {
                router.push('/sign-in');
            }
            toast.error(error.message);
        }
    }));

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        await createProject.mutateAsync({
            value: values.value,
        });
    };

    const onSelect = (value: string) => {
        form.setValue("value", value, {
            shouldDirty: true,
            shouldValidate: true,
            shouldTouch: true,
        });
    };

    const isPending = createProject.isPending;
    const watchedValue = form.watch("value");
    const isButtonDisabled = isPending || !watchedValue.trim();

    return (
        <div className="w-full space-y-4">
            {/* Terminal/Code Editor Style Container */}
            <div className={cn(
                "rounded-lg border border-border bg-muted/50 transition-all duration-200",
                isFocused && "border-foreground/20 shadow-sm"
            )}>
                {/* Window Controls */}
                <div className="flex items-center gap-2 px-4 py-3 border-b border-border/50">
                    <div className="flex items-center gap-1.5">
                        <div className="h-3 w-3 rounded-full bg-red-500/80 hover:bg-red-500 transition-colors" />
                        <div className="h-3 w-3 rounded-full bg-yellow-500/80 hover:bg-yellow-500 transition-colors" />
                        <div className="h-3 w-3 rounded-full bg-green-500/80 hover:bg-green-500 transition-colors" />
                    </div>
                    <span className="text-xs text-muted-foreground font-mono ml-2">setn.ai</span>
                </div>

                {/* Code Editor Area */}
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="relative">
                        <div className="p-4">
                            {/* Code Comment */}
                            <div className="text-sm text-muted-foreground font-mono mb-2">
                            </div>
                            
                            {/* Prompt Input */}
                            <div className="flex items-start gap-3">
                                <span className="text-sm font-mono text-muted-foreground select-none">
                                    <span className="text-blue-600 dark:text-blue-400">const</span>{" "}
                                    <span className="text-foreground">prompt</span>{" "}
                                    <span className="text-muted-foreground">=</span>{" "}
                                    <span className="text-green-600 dark:text-green-400">"</span>
                                </span>
                                <FormField
                                    control={form.control}
                                    name="value"
                                    render={({ field }) => (
                                        <div className="flex relative">
                                            <TextareaAutosize
                                                {...field}
                                                disabled={isPending}
                                                onFocus={() => setIsFocused(true)}
                                                onBlur={() => setIsFocused(false)}
                                                minRows={1}
                                                maxRows={6}
                                                className="w-[90%] resize-none border-none outline-none bg-transparent text-sm font-mono text-green-600 dark:text-green-400 placeholder:text-green-600/50 dark:placeholder:text-green-400/60"
                                                placeholder="Create a modern blog with authentication..."
                                                onKeyDown={(e) => {
                                                    if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
                                                        e.preventDefault();
                                                        form.handleSubmit(onSubmit)(e);
                                                    }
                                                }}
                                            />
                                            <span className="text-sm font-mono text-green-600 dark:text-green-400 select-none flex">"</span>
                                        </div>
                                    )}
                                />
                            </div>

                            {/* Execute Button */}
                            <div className="mt-4 flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <kbd className="inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
                                        <span className="text-xs">⌘</span>Enter
                                    </kbd>
                                    <span className="text-xs text-muted-foreground">to generate</span>
                                </div>
                                
                                <Button
                                    type="submit"
                                    disabled={isButtonDisabled}
                                    size="sm"
                                    className={cn(
                                        "gap-2",
                                        isPending && "cursor-wait"
                                    )}
                                >
                                    {isPending ? (
                                        <>
                                            <Loader2 className="h-4 w-4 animate-spin" />
                                            Generating...
                                        </>
                                    ) : (
                                        <>
                                            Generate
                                            <ArrowRight className="h-4 w-4" />
                                        </>
                                    )}
                                </Button>
                            </div>
                        </div>
                    </form>
                </Form>
            </div>

            {/* Template Suggestions */}
            <div className="flex flex-wrap gap-2 justify-center">
                <span className="text-xs text-muted-foreground flex items-center gap-1">
                    <Sparkles className="h-3 w-3" />
                    Try:
                </span>
                {PROJECT_TEMPLATES.slice(0, 4).map((template) => (
                    <Button
                        key={template.title}
                        variant="ghost"
                        size="sm"
                        className="h-7 text-xs font-normal"
                        onClick={() => onSelect(template.prompt)}
                        disabled={isPending}
                    >
                        {template.emoji} {template.title}
                    </Button>
                ))}
            </div>
        </div>
    );
};