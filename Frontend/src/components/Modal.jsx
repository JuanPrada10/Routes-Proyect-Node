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
    <div className="absolute bottom-0 top-0 left-0 right-0 bg-black/50 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white h-auto w-120 rounded-xl p-8">
        <h1 className="text-3xl font-bold text-center mb-8">{title}</h1>
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
          <div className="flex justify-evenly mt-6">
            <button
              type="button"
              onClick={onClose}
              className="bg-red-600 p-2 rounded-sm text-white hover:bg-red-700 transition-all duration-150 shadow-xl"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="bg-green-600 p-2 rounded-sm text-white hover:bg-green-700 transition-all duration-150"
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
