import type { FormEvent } from 'react';
import { Link } from 'react-router-dom';
import type { LoginFormData, LoginFormErrors } from '@/components';
import { Input, Loader } from '@/components';

interface Props {
  formData: LoginFormData;
  errors: LoginFormErrors;
  isLoading: boolean;
  handleSubmit: (e: FormEvent<Element>) => Promise<void>;
  handleInputChange: (field: keyof LoginFormData, value: string) => void;
}

export const FormLogin = ({
  formData,
  errors,
  isLoading,
  handleSubmit,
  handleInputChange,
}: Props) => {
  return (
    <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
      {errors.general && (
        <div className="bg-red-900/30 border border-red-700/50 text-red-400 px-3 py-2.5 md:px-4 md:py-3 rounded-lg text-sm md:text-base">
          {errors.general}
        </div>
      )}

      {['email', 'password'].map((label) => (
        <Input
          label={label as keyof LoginFormData}
          key={label}
          formData={formData}
          errors={errors}
          //@ts-expect-error
          handleInputChange={handleInputChange}
        />
      ))}

      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-4 py-3 md:px-5 md:py-2.5 rounded-md hover:from-emerald-600 hover:to-teal-600 transition-all duration-200 text-sm md:text-base shadow-lg shadow-emerald-500/20 font-semibold min-h-[44px] touch-manipulation"
      >
        {isLoading ? (
          <div className="flex items-center justify-center">
            <Loader className="animate-spin -ml-1 mr-2 md:mr-3 h-4 w-4 md:h-5 md:w-5 text-white" />
            Signing in...
          </div>
        ) : (
          'Sign In'
        )}
      </button>

      <div className="text-center">
        <span className="text-xs md:text-sm text-gray-400">
          Don't have an account?{' '}
          <Link
            to="/register"
            className="font-medium text-emerald-400 hover:text-emerald-300 transition-colors duration-200 underline-offset-2 hover:underline"
          >
            Create one here
          </Link>
        </span>
      </div>
    </form>
  );
};
