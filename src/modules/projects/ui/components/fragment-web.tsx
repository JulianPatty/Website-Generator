import { Fragment } from '@/generated/prisma';
import { useState } from 'react';
import { ExternalLinkIcon, RefreshCwIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Hint } from '@/components/hint';
import { CheckIcon, CopyIcon } from 'lucide-react';

interface Props {
    data: Fragment;
};

export const FragmentWeb = ({ data }: Props) => {
    
    const [copied, setCopied] = useState(false);
    const [fragmentKey, setFragmentKey] = useState(0);

    const onRefresh = () => {
        setFragmentKey((prev) => prev + 1);
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(data.sandboxUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };
   
    
    return (

        <div className="mx-auto max-w-7xl pt-2 pl-2">
        <div className="rounded-lg border border-border bg-background shadow-xl overflow-hidden">
            {/* macOS Window Title Bar */}
            <div className="bg-sidebar border-b border-border px-4 py-3 flex items-center">
                {/* Traffic Light Buttons */}
                <div className="flex items-center gap-2 mr-4">
                    <div className="h-3 w-3 rounded-full bg-red-500 hover:opacity-80 cursor-pointer" />
                    <div className="h-3 w-3 rounded-full bg-yellow-500 hover:opacity-80 cursor-pointer" />
                    <div className="h-3 w-3 rounded-full bg-green-500 hover:opacity-80 cursor-pointer" />
                </div>
                
                {/* URL Bar / Controls */}
                <div className="flex items-center gap-2 flex-1">
                    <Hint text="Refresh" side="bottom" align="start">
                        <Button size="sm" variant="ghost" onClick={onRefresh}>
                            <RefreshCwIcon className="h-4 w-4" />
                        </Button>
                    </Hint>
                    
                    {/* URL Display */}
                    <div className="flex-1 bg-muted/50 rounded-md px-3 py-1.5 flex items-center gap-2">
                        <span className="text-sm text-muted-foreground truncate">
                            {data.sandboxUrl || "No URL loaded"}
                        </span>
                        <Hint text="Copy URL" side="bottom">
                            <Button
                                size="sm"
                                variant="ghost"
                                onClick={handleCopy}
                                disabled={!data.sandboxUrl || copied}
                                className="ml-auto h-6 w-6 p-0"
                            >
                                {copied ? <CheckIcon className="h-3 w-3" /> : <CopyIcon className="h-3 w-3" />}
                            </Button>
                        </Hint>
                    </div>
                    
                    <Hint text="Open in new tab" side="bottom" align="end">
                        <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => {
                                if (!data.sandboxUrl) return;
                                window.open(data.sandboxUrl, "_blank");
                            }}
                        >
                            <ExternalLinkIcon className="h-4 w-4" />
                        </Button>
                    </Hint>
                </div>
            </div>
            
            {/* IFrame Content Area */}
            <div className="bg-white" style={{ height: '600px' }}>
                <iframe
                    key={fragmentKey}
                    className="w-full h-full"
                    sandbox="allow-forms allow-scripts allow-same-origin"
                    loading="lazy"
                    src={data.sandboxUrl}
                />
            </div>
        </div>
    </div>
    )
};