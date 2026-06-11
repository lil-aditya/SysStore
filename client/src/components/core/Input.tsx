import type { FormData, FormErrors, LoginFormData } from '@/components';

interface Props {
  formData: FormData;
  errors: FormErrors;
  label: keyof FormData | keyof LoginFormData;
  className?: string;
  handleInputChange: (field: keyof FormData, value: string) => void;
}

export const Input = ({
  formData,
  errors,
  label,
  className,
  handleInputChange,
}: Props) => {
  return (
    <div>
      <label
        htmlFor={label}
        className="block text-xs md:text-sm font-medium text-gray-300 mb-1.5 md:mb-2"
      >
        {label.charAt(0).toUpperCase() + label.slice(1)}
      </label>

      <input
        id={label}
        name={label}
        type={
          label === 'password'
            ? 'password'
            : label === 'email'
              ? 'email'
              : 'text'
        }
        autoComplete={label}
        required
        value={formData[label] || ''}
        onChange={(e) => handleInputChange(label, e.target.value)}
        className={
          `w-full px-3 py-2.5 md:py-3 border text-sm md:text-base bg-gray-800 text-gray-100 ${
            errors[label] ? 'border-red-500/50' : 'border-gray-700'
          } rounded-lg shadow-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-transparent min-h-[44px]` +
          (className ? ` ${className}` : '')
        }
        placeholder={`Enter your ${label}`}
      />
      {errors[label] && (
        <p className="mt-1 text-xs md:text-sm text-red-400">{errors[label]}</p>
      )}
    </div>
  );
};
