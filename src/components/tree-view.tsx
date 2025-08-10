import { TreeItem } from "@/types";
import { Sidebar, SidebarContent, SidebarGroupContent,  SidebarGroup, SidebarRail, SidebarMenuItem, SidebarMenu, SidebarMenuSub, SidebarMenuButton, SidebarProvider} from "@/components/ui/sidebar";
import { FileIcon, FolderIcon, ChevronRightIcon } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@radix-ui/react-collapsible";

interface TreeViewProps  {
    data: TreeItem[];
    value?: string | null;
    onSelect?: (value: string) => void;

}

export const TreeView = ({
    data,
    value,
    onSelect,
}: TreeViewProps) => {
    return (
        <SidebarProvider>
            <Sidebar collapsible="icon" className="w-full">
                <SidebarContent>
                    <SidebarGroup>
                        <SidebarGroupContent>
                            <SidebarMenu>
                                {data.map((item, index) => (
                                    <Tree 
                                    key={index}
                                    item={item}
                                    selectedValue={value}
                                    onSelect={onSelect}
                                    parentPath=""
                                />
                                ))}

                               
                                      
                                 
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                </SidebarContent>
                <SidebarRail />
            </Sidebar>
        </SidebarProvider>
         
)};

interface TreeProps {
    item: TreeItem;
    selectedValue?: string | null;
    onSelect?: (value: string) => void;
    parentPath?: string;

};

const Tree = ({ item, selectedValue, onSelect, parentPath }: TreeProps) => {
    const [name, ...items] = Array.isArray(item) ? item: [item];
    const currentPath = parentPath ? `${parentPath}/${name}` : name;

    if (!items.length) {
        const isSelected = selectedValue === currentPath;

        return (
            <SidebarMenuButton 
            isActive={isSelected}
            className="data-[active=true]:bg-transparent"
            onClick={() => onSelect?.(currentPath || "")}
        >
            <FileIcon className="truncate" />
            <span>{name}</span>
        </SidebarMenuButton>
        )
    }


return  (
    <SidebarMenuItem>
        <Collapsible 
        className="group/collapsible [&data-state=open]> buttton:svg: first-child]: rotate-90"
        defaultOpen
        > 
        <CollapsibleTrigger asChild> 
        <SidebarMenuButton> 
            <ChevronRightIcon className="transition-transform" />
            <FolderIcon className="truncate" />
            <span>{name}</span> 
        </SidebarMenuButton>
        </CollapsibleTrigger>
        <CollapsibleContent>
        <SidebarMenuSub>
            {items.map((subItem, index) => (
                <Tree 
                key={index}
                item={subItem}
                selectedValue={selectedValue}
                onSelect={onSelect}
                parentPath={currentPath}
            />
            ))}
            </SidebarMenuSub>
            </CollapsibleContent>
        </Collapsible>
    </SidebarMenuItem>
)
};