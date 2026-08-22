/**
 * Restablecimiento de contraseña I.T.R.
 *
 * Responsabilidad:
 * - Validar los campos del formulario.
 * - Comprobar que las contraseñas coincidan.
 * - Mostrar mensajes al usuario.
 *
 * La comunicación con API/backend se implementará posteriormente.
 */

document.addEventListener("DOMContentLoaded", () => {

    const form = document.getElementById("resetPasswordForm");
    const message = document.getElementById("resetPasswordMessage");

    if (!form || !message) {
        console.error(
            "No se encontró el formulario de restablecimiento."
        );
        return;
    }

    form.addEventListener("submit", (event) => {

        event.preventDefault();

        const username =
            document.getElementById("resetUsername")?.value.trim();

        const newPassword =
            document.getElementById("newPassword")?.value;

        const confirmPassword =
            document.getElementById("confirmPassword")?.value;


        if (!username || !newPassword || !confirmPassword) {

            showResetMessage(
                "Complete todos los campos requeridos.",
                "error"
            );

            return;
        }


        if (username.length < 3) {

            showResetMessage(
                "El usuario debe tener al menos 3 caracteres.",
                "error"
            );

            return;
        }


        if (newPassword.length < 6) {

            showResetMessage(
                "La nueva contraseña debe tener al menos 6 caracteres.",
                "error"
            );

            return;
        }


        if (newPassword !== confirmPassword) {

            showResetMessage(
                "Las contraseñas no coinciden.",
                "error"
            );

            return;
        }


        showResetMessage(
            "Los datos fueron validados correctamente. El restablecimiento será procesado posteriormente.",
            "success"
        );

    });


    form.querySelectorAll(".form-input").forEach((input) => {

        input.addEventListener("input", () => {

            message.hidden = true;
            message.textContent = "";

        });

    });

});


/**
 * Muestra mensajes del formulario.
 *
 * @param {string} text
 * @param {"success"|"error"|"info"} type
 */
function showResetMessage(text, type = "error") {

    const message =
        document.getElementById("resetPasswordMessage");

    if (!message) {
        return;
    }

    message.textContent = text;

    message.classList.remove(
        "form-message--success",
        "form-message--error",
        "form-message--info"
    );

    message.classList.add(
        `form-message--${type}`
    );

    message.hidden = false;
}