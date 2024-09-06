import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useRouter } from '@/routes/hooks';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import axios from 'axios'; 
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { getURLbyEndPointV2 } from '@/store/api';
import { useNavigate } from 'react-router-dom';

// Update the schema to include a password field
const formSchema = z.object({
  email: z.string().email({ message: 'Enter a valid email address' }),
  password: z.string().min(1, { message: 'Password must be at least 6 characters long' }) // Example validation
});

type UserFormValue = z.infer<typeof formSchema>;

export default function UserAuthForm() {
  const navigate = useNavigate();
  const router = useRouter();
  const [loading, setLoading] = useState(false); // Added loading state
  const [errorMessage, setErrorMessage] = useState(''); // Handle error messages

  const defaultValues = {
    email: '',
    password: ''
  };

  const form = useForm<UserFormValue>({
    resolver: zodResolver(formSchema),
    defaultValues
  });
;

const onSubmit = async (data: UserFormValue) => {
  setLoading(true);
  setErrorMessage(''); // Reset error message on submission
  try {
    // Make the login API request
    const response = await axios.post(getURLbyEndPointV2('loginMaster'), data);

    if (response.status === 200 && response.data.status) {
      // Save token in localStorage
      localStorage.setItem('token', response.data.data.token);

      // Redirect to dashboard after successful login
      navigate('/');
    } else {
      // Display error message if login fails
      setErrorMessage(response.data.message || 'Login failed');
    }
  } catch (error: any) {
    setErrorMessage(error.response?.data?.message || 'An error occurred');
  } finally {
    setLoading(false); // Set loading to false after submission completes
  }
};

 
return (
  <>
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full space-y-4" // Retain the original class
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="Enter your email..."
                  disabled={loading}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Enter your password..."
                  disabled={loading}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Display error message */}
        {errorMessage && (
          <div className="text-red-500 text-sm">{errorMessage}</div>
        )}

        <Button disabled={loading} className="ml-auto w-full" type="submit">
          {loading ? 'Logging in...' : 'Login'}
        </Button>
      </form>
    </Form>
  </>
);
}
