// src/components/global/results-table.tsx
import { ImageCategorization } from "@/types/upload";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/atoms/table";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/atoms/tooltip";

interface ResultsTableProps {
  data: ImageCategorization[];
}

const ResultsTable: React.FC<ResultsTableProps> = ({ data }) => {
  // Category color mapping
  const getCategoryColor = (category: string) => {
    const categoryColors: Record<string, string> = {
      'Kegiatan': 'bg-red-100 text-red-800',
      'Manusia': 'bg-blue-100 text-blue-800',
      'Hewan': 'bg-green-100 text-green-800',
      'Pemandangan': 'bg-yellow-100 text-yellow-800',
      'Suasana': 'bg-purple-100 text-purple-800'
    }
    
    // Find matching category (case insensitive)
    const matchedCategory = Object.keys(categoryColors).find(
      key => key.toLowerCase() === category.toLowerCase()
    )
    
    return matchedCategory ? categoryColors[matchedCategory] : 'bg-gray-100 text-gray-800'
  }
  return (
    <TooltipProvider>
      <div className="w-full max-w-6xl mx-auto mt-6">
        <Table>
          <TableCaption>
            Detail hasil kategorisasi gambar ({data.length} file diproses)
          </TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Nama File</TableHead>
              <TableHead>Caption</TableHead>
              <TableHead>Kategori</TableHead>
              <TableHead className="text-right">Cosine Similarity</TableHead>
              <TableHead className="text-right">BLEU Score</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((item, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <span className="max-w-xs truncate block cursor-help">
                        {item.filename}
                      </span>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="max-w-xs break-words">{item.filename}</p>
                    </TooltipContent>
                  </Tooltip>
                </TableCell>
                <TableCell>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <span className="max-w-xs truncate block cursor-help">
                        {item.caption}
                      </span>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="max-w-sm break-words">{item.caption}</p>
                    </TooltipContent>
                  </Tooltip>
                </TableCell>
                <TableCell>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getCategoryColor(item.category)}`}>
                    {item.category}
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  {item.cosine_similarity.toFixed(4)}
                </TableCell>
                <TableCell className="text-right">
                  {item.bleu_score.toFixed(4)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </TooltipProvider>
  );
};

export { ResultsTable };
