import { AppLayout } from '@/components/app-layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { registeredFaculty, students } from '@/lib/data';
import Image from 'next/image';
import { Trash2 } from 'lucide-react';

const allUsers = [
  ...students.map(s => ({ ...s, role: 'Student' })),
  ...registeredFaculty.map(f => ({ ...f, role: 'Faculty' }))
];

export default function UserManagementPage() {
  return (
    <AppLayout>
      <div className="flex flex-col gap-8">
        <div>
          <h1 className="text-3xl md:text-4xl font-headline tracking-tight">User Management</h1>
          <p className="text-muted-foreground mt-1">View and manage all users on the platform.</p>
        </div>

        <Card>
            <CardContent className="p-0">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>User</TableHead>
                            <TableHead className="hidden md:table-cell">Email</TableHead>
                             <TableHead className="hidden sm:table-cell">Role</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {allUsers.map(user => (
                            <TableRow key={user.email}>
                                <TableCell>
                                    <div className="flex items-center gap-3">
                                        <Image src={user.avatarUrl} width={40} height={40} alt={user.name} data-ai-hint="profile picture" className="rounded-full" />
                                        <div>
                                            <div className="font-medium">{user.name}</div>
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell className="hidden md:table-cell">{user.email}</TableCell>
                                <TableCell className="hidden sm:table-cell">
                                    <Badge variant={user.role === 'Student' ? 'secondary' : 'default'}>{user.role}</Badge>
                                </TableCell>
                                <TableCell className="text-right">
                                    <Button variant="ghost" size="icon" className="text-destructive"><Trash2 className="h-4 w-4" /></Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
