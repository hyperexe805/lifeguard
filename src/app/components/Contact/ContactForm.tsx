"use client";

import React, { useState } from "react";
import { supabase } from "../../../lib/supabase"; // Ajusta la ruta según la ubicación de tu módulo Supabase
import { Button } from "@/components/ui/button"; // Ajusta según tus componentes UI
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface FormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

interface SubmitStatus {
  type: "success" | "error";
  message: string;
}

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus | null>(null);

  // Validar los datos del formulario antes de enviarlos
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    setErrors({});

    if (!formData.name.trim()) {
      newErrors.name = "El nombre es requerido.";
    } else if (formData.name.length < 2) {
      newErrors.name = "El nombre debe tener al menos 2 caracteres.";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = "El email es requerido.";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Por favor, ingresa un email válido.";
    }

    if (!formData.message.trim()) {
      newErrors.message = "El mensaje es requerido.";
    } else if (formData.message.length < 10) {
      newErrors.message = "El mensaje debe tener al menos 10 caracteres.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Manejar cambios en los campos del formulario
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Manejar el envío del formulario
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const { data, error } = await supabase
        .from("contacts") // Asegúrate de que exista una tabla "contacts" en tu Supabase
        .insert([
          {
            name: formData.name,
            email: formData.email,
            phone: formData.phone || null, // Si no hay teléfono, lo envía como null
            message: formData.message,
            created_at: new Date().toISOString(),
          },
        ]);

      if (error) {
        console.error("Error en Supabase:", error);
        throw error;
      }

      console.log("Datos insertados en Supabase:", data);

      setSubmitStatus({
        type: "success",
        message: "Gracias por contactarnos. Nos pondremos en contacto pronto.",
      });

      // Reiniciar el formulario
      setFormData({ name: "", email: "", phone: "", message: "" });
    } catch (err) {
      console.error("Error al enviar el formulario:", err);

      setSubmitStatus({
        type: "error",
        message: "Hubo un problema al enviar el formulario. Por favor, inténtalo de nuevo.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardContent className="pt-6">
        {submitStatus && (
          <Alert
            className={`mb-4 ${
              submitStatus.type === "error" ? "bg-red-50" : "bg-green-50"
            }`}
          >
            <AlertDescription>{submitStatus.message}</AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Nombre */}
          <div>
            <label className="block text-sm font-medium mb-1">Nombre</label>
            <Input
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Tu nombre"
              aria-invalid={!!errors.name}
              className={`${
                errors.name ? "border-red-500 focus-visible:ring-red-500" : ""
              }`}
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <Input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="tu@email.com"
              aria-invalid={!!errors.email}
              className={`${
                errors.email ? "border-red-500 focus-visible:ring-red-500" : ""
              }`}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          {/* Teléfono */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Teléfono (opcional)
            </label>
            <Input
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Tu teléfono"
            />
          </div>

          {/* Mensaje */}
          <div>
            <label className="block text-sm font-medium mb-1">Mensaje</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Tu mensaje"
              aria-invalid={!!errors.message}
              className={`w-full min-h-[100px] rounded-md border p-2 ${
                errors.message
                  ? "border-red-500 focus-visible:ring-red-500"
                  : "border-input"
              }`}
            />
            {errors.message && (
              <p className="text-red-500 text-sm mt-1">{errors.message}</p>
            )}
          </div>

          {/* Botón */}
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Enviando..." : "Enviar mensaje"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}