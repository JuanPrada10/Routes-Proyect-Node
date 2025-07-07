import { useState, useEffect } from "react";
import { ClipLoader } from "react-spinners";

function Modal({
  isOpen,
  onClose,
  onSubmit,
  initialData = {},
  fields = [],
  title = "Modal",
}) {
  const [formData, setFormData] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setFormData(initialData || {});
  }, [initialData, isOpen]);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === "number" ? Number(value) : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    await onSubmit(formData);
    setIsLoading(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center z-50 p-2 sm:p-4">
      <div className="bg-white w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg rounded-xl p-4 sm:p-8 shadow-2xl transition-all duration-200">
        <h1 className="text-2xl sm:text-3xl font-bold text-center mb-6 sm:mb-8">
          {title}
        </h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {fields.map((field) => (
            <label
              key={field.name}
              className="flex flex-col w-full gap-1 text-slate-900 font-semibold"
            >
              {field.label}
              <input
                type={field.type}
                name={field.name}
                value={formData[field.name] ?? ""}
                onChange={handleChange}
                placeholder={field.placeholder || field.label}
                className="border-b-1 border-slate-800 focus:outline-0 transition-all duration-100 focus:border-b-2 focus:border-b-sky-700 font-normal p-1"
                min={field.type === "number" ? 0 : undefined}
                max={field.type === "number" ? 100000 : undefined}
                disabled={field.disabled}
              />
            </label>
          ))}
          <div className="flex flex-col sm:flex-row justify-evenly gap-2 sm:gap-6 mt-4 sm:mt-6">
            <button
              type="button"
              onClick={onClose}
              className="bg-red-600 p-2 rounded-sm text-white hover:bg-red-700 transition-all duration-150 shadow-xl w-full sm:w-auto"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="bg-green-600 p-2 rounded-sm text-white hover:bg-green-700 transition-all duration-150 w-full sm:w-auto"
            >
              {isLoading ? (
                <ClipLoader />
              ) : title.includes("Actualizar") ? (
                "Actualizar"
              ) : (
                "Agregar"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Modal;
