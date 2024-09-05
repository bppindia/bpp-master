import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export default function RecentSales({ users = [] }) {
  return (
    <div className="space-y-8 overflow-auto">
      {users.length > 0 ? (
        users.slice(0, 5).map((user) => (
          <div key={user._id} className="flex items-center">
            <Avatar className="h-9 w-9">
              <AvatarImage />
              <AvatarFallback>{user.firstName[0]}</AvatarFallback>
            </Avatar>
            <div className="ml-4 space-y-1">
              <p className="text-sm font-medium leading-none">{user.firstName} {user.lastName}</p>
              <p className="text-sm text-muted-foreground">{user.voterIdNo}</p>
            </div>
            <div className="ml-auto font-medium">{user.gender}</div>
          </div>
        ))
      ) : (
        <p className="text-center text-sm text-muted-foreground">No users available</p>
      )}
    </div>
  );
}
