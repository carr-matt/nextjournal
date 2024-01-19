import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

const EntryCard = ({ entry }) => {
  const date = new Date(entry.createdAt).toDateString();
  const time = new Date(entry.createdAt).toLocaleTimeString();

  return (
    <Card className="cursor-pointer">
      <CardHeader>
        <CardTitle>{date}</CardTitle>
        <CardDescription>{time}</CardDescription>
      </CardHeader>
      <CardContent>{entry.analysis?.summary}</CardContent>
      <CardFooter>{entry.analysis?.mood}</CardFooter>
    </Card>
  );
};

export default EntryCard;
