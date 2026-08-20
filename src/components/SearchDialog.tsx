import { useEffect, useState } from "react";
import { useNavigate } from "@/components/LocalizedLink";
import { useTranslation } from "react-i18next";
import { BookOpen, Package } from "lucide-react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { useProducts } from "@/data/products";
import { useCurrency } from "@/context/CurrencyContext";

interface SearchArticle {
  slug: string;
  title: string;
  category: string;
}

interface SearchDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const SearchDialog = ({ open, onOpenChange }: SearchDialogProps) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const products = useProducts();
  const { format: formatPrice } = useCurrency();
  const [articles, setArticles] = useState<SearchArticle[]>([]);

  // Kennisdata pas laden als de dialog opent - houdt de grote data-file uit de main bundle
  useEffect(() => {
    if (!open || articles.length > 0) return;
    import("@/data/knowledge").then(mod => {
      setArticles(mod.knowledgeArticles.map(a => ({ slug: a.slug, title: a.title, category: a.category })));
    });
  }, [open, articles.length]);

  const go = (path: string) => {
    onOpenChange(false);
    navigate(path);
  };

  return (
    <CommandDialog open={open} onOpenChange={onOpenChange}>
      <CommandInput placeholder={t("searchDialog.placeholder")} />
      <CommandList>
        <CommandEmpty>{t("searchDialog.noResults")}</CommandEmpty>
        <CommandGroup heading={t("searchDialog.products")}>
          {products.map(p => (
            <CommandItem
              key={p.id}
              value={`${p.name} ${p.categoryLabel} ${p.shortDescription}`}
              onSelect={() => go(`/product/${p.slug}`)}
              className="gap-3"
            >
              {p.images[0] ? (
                <img src={p.images[0]} alt="" className="w-9 h-9 rounded-md object-cover bg-secondary" />
              ) : (
                <Package className="w-4 h-4 text-muted-foreground" />
              )}
              <span className="flex-1 truncate">{p.name}</span>
              <span className="text-xs text-muted-foreground">{formatPrice(p.price)}</span>
            </CommandItem>
          ))}
        </CommandGroup>
        {articles.length > 0 && (
          <CommandGroup heading={t("searchDialog.articles")}>
            {articles.map(a => (
              <CommandItem
                key={a.slug}
                value={`${a.title} ${a.category}`}
                onSelect={() => go(`/kennis/${a.slug}`)}
                className="gap-3"
              >
                <BookOpen className="w-4 h-4 text-muted-foreground shrink-0" />
                <span className="flex-1 truncate">{a.title}</span>
                <span className="text-xs text-muted-foreground">{a.category}</span>
              </CommandItem>
            ))}
          </CommandGroup>
        )}
      </CommandList>
    </CommandDialog>
  );
};

export default SearchDialog;
