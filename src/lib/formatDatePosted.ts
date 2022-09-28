export default function formatDatePosted(date: string): string {
  const now = new Date(Date.now());
  const current = new Date(date);
  const diff = now.getTime() - current.getTime();
  // console.log("diff", diff / 1000 / 60);
  if (diff / 1000 / 60 < 60) {
    return (diff / 1000 / 60).toFixed(0) + " minutes ago";
  }
  return (diff / 1000 / 60 / 60).toFixed(0) + " hours ago";
}
