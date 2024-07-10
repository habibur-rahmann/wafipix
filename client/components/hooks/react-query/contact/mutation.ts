import { sendContactMail } from "@/lib/services/contact.service"
import { useMutation } from "@tanstack/react-query"


export const useSendContactMail = () => {
    return useMutation({
        mutationFn: sendContactMail
    })
}