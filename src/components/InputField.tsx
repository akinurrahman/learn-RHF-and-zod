
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useFormContext } from "react-hook-form"; 
interface InputFieldProps {
    label: string;
    type: string;
    placeholder: string;
    name: string;
}

const InputField: React.FC<InputFieldProps> = ({ label, type, placeholder, name }) => {
    const { register, formState: { errors } } = useFormContext(); // Access form methods from context

    return (
        <div className="mb-4">
            <Label htmlFor={name} className="text-sm font-medium text-gray-700">
                {label}
            </Label>
            <Input
                {...register(name)}
                type={type}
                id={name}
                placeholder={placeholder}
                className={`mt-1 block text-black w-full ${errors[name] ? "border-red-500" : ""}`} // Handle error styling
            />
            {errors[name] && <p className="text-sm text-red-500 mt-1">{(errors[name]?.message as string)}</p>}
        </div>
    );
};

export default InputField;
