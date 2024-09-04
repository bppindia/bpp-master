import { Checkbox } from '@/components/ui/checkbox';
import { Employee } from '@/constants/data';
import { ColumnDef } from '@tanstack/react-table';
import { CellAction } from './cell-action';

export const columns: ColumnDef<Employee>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false
  },
  {
    accessorKey: 'firstName',
    header: 'First Name'
  },
  {
    accessorKey: 'lastName',
    header: 'Last Name'
  },
  {
    accessorKey: 'fatherName',
    header: 'Father Name'
  },
  {
    accessorKey: 'gender',
    header: 'GENDER'
  },
  {
    accessorKey: 'dob',
    header: 'Date Of Birth'
  },
  {
    accessorKey: 'profession',
    header: 'Profession'
  },
  {
    accessorKey: 'state',
    header: 'State'
  },
  {
    accessorKey: 'city',
    header: 'Taluka/city/village'
  },
  {
    accessorKey: 'district',
    header: 'District'
  },
  {
    accessorKey: 'voterIdNo',
    header: 'Voter ID Number'
  },
  {
    accessorKey: 'phoneNo',
    header: 'Phone No'
  },
  {
    accessorKey: 'email',
    header: 'Email'
  },
  {
    id: 'actions',
    cell: ({ row }) => <CellAction data={row.original} />
  }
];
