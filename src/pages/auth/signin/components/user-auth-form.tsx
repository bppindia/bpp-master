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

// Schema for both login and OTP
const formSchema = z.object({
  email: z.string().email({ message: 'Enter a valid email address' }),
  password: z.string().min(2, { message: 'Password must be at least 6 characters long' }),
  otp: z.string().optional(), // OTP field for 2FA
});

type UserFormValue = z.infer<typeof formSchema>;

export default function UserAuthForm() {
  const navigate = useNavigate();
  const router = useRouter();
  const [is2FARequired, setIs2FARequired] = useState(false);
  const [userId, setUserId] = useState<string | null>(null); // Save userId for OTP verification
  const [loading, setLoading] = useState(false); 
  const [errorMessage, setErrorMessage] = useState(''); 

  const defaultValues = {
    email: '',
    password: '',
    otp: ''
  };

  const form = useForm<UserFormValue>({
    resolver: zodResolver(formSchema),
    defaultValues
  });

  const onSubmit = async (data: UserFormValue) => {
    setLoading(true);
    setErrorMessage(''); 
    try {
      if (!is2FARequired) {
        // Step 1: Login request
        const response = await axios.post(getURLbyEndPointV2('loginMaster'), { email: data.email, password: data.password });

        if (response.status === 200 && response.data.status) {
          // 2FA required
          setIs2FARequired(true);
          setUserId(response.data.data.userId); // Store userId for OTP verification
        } else {
          setErrorMessage(response.data.message || 'Login failed');
        }
      } else {
        // Step 2: OTP Verification request
        const otpResponse = await axios.post(getURLbyEndPointV2('verify2FA'), { userId, code: data.otp });

        if (otpResponse.status === 200 && otpResponse.data.status) {
          localStorage.setItem('token', otpResponse.data.data.token);
          navigate('/'); // Navigate to the dashboard
        } else {
          setErrorMessage(otpResponse.data.message || 'Invalid OTP');
        }
      }
    } catch (error: any) {
      setErrorMessage(error.response?.data?.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-4">
        {!is2FARequired && (
          <>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="Enter your email..." disabled={loading} {...field} />
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
                    <Input type="password" placeholder="Enter your password..." disabled={loading} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </>
        )}

        {is2FARequired && (
          <FormField
            control={form.control}
            name="otp"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Enter OTP</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="Enter the OTP..." disabled={loading} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        {errorMessage && (
          <div className="text-red-500 text-sm">{errorMessage}</div>
        )}

        <Button disabled={loading} className="ml-auto w-full" type="submit">
          {loading ? (is2FARequired ? 'Verifying OTP...' : 'Logging in...') : (is2FARequired ? 'Verify OTP' : 'Login')}
        </Button>
      </form>
    </Form>
  );
}
