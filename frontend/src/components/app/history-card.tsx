import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';

interface BetHistoryItem {
  id: string;
  amount: number;
  selection: 'heads' | 'tails';
  result: 'heads' | 'tails';
  won: boolean;
  timestamp: Date;
}

export function HistoryCard() {
  // Mocked history data
  const historyItems: BetHistoryItem[] = [
    {
      id: '1',
      amount: 0.5,
      selection: 'heads',
      result: 'heads',
      won: true,
      timestamp: new Date(Date.now() - 2 * 60 * 1000)
    },
    {
      id: '2',
      amount: 0.3,
      selection: 'tails',
      result: 'heads',
      won: false,
      timestamp: new Date(Date.now() - 5 * 60 * 1000)
    },
    {
      id: '3',
      amount: 0.2,
      selection: 'heads',
      result: 'tails',
      won: false,
      timestamp: new Date(Date.now() - 12 * 60 * 1000)
    },
    {
      id: '4',
      amount: 0.4,
      selection: 'tails',
      result: 'tails',
      won: true,
      timestamp: new Date(Date.now() - 17 * 60 * 1000)
    },
    {
      id: '5',
      amount: 1.0,
      selection: 'heads',
      result: 'heads',
      won: true,
      timestamp: new Date(Date.now() - 25 * 60 * 1000)
    }
  ];

  const formatTimeDifference = (timestamp: Date) => {
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - timestamp.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes === 1) return '1 minute ago';
    if (diffInMinutes < 60) return `${diffInMinutes} minutes ago`;
    
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours === 1) return '1 hour ago';
    if (diffInHours < 24) return `${diffInHours} hours ago`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays === 1) return '1 day ago';
    return `${diffInDays} days ago`;
  };

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="text-xl">Bet History</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[300px] pr-4">
          <div className="space-y-4">
            {historyItems.map((item) => (
              <div key={item.id}>
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h4 className="font-medium">
                      {item.amount} SOL on {item.selection}
                    </h4>
                    <p className="text-xs text-muted-foreground">
                      {formatTimeDifference(item.timestamp)}
                    </p>
                  </div>
                  <Badge variant={item.won ? "default" : "destructive"} className="ml-2">
                    {item.won ? `+${(item.amount).toFixed(1)}` : `-${item.amount.toFixed(1)}`}
                  </Badge>
                </div>
                <Separator className="mt-2" />
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}