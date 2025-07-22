import React from 'react'
import BaseCard from './BaseCard'
import InputField from '@/components/Common/DataInput/InputField'
import FormElement from '@/components/Common/Form/FormElement'

const ClientData = () => {
    return (
        <BaseCard title="Cliente">
            <FormElement>
                <InputField legend="Nombre" name="ClientName" required={true} />
            </FormElement>
            <FormElement>
                <InputField
                    legend="Direccion"
                    name="ClientAddress"
                    required={true}
                />
            </FormElement>

            <div className="divider"></div>
            <p className="text-xs pb-4 pt-2 font-extrabold tracking-wide">
                CONTACTO
            </p>
            <FormElement>
                <InputField
                    legend="Correo"
                    name="ClientEmail"
                    type="email"
                    required={true}
                />
            </FormElement>
            <FormElement className="grid grid-cols-2 gap-4">
                <InputField
                    legend="Telefono"
                    name="ClientPhone"
                    required={true}
                />
                <InputField legend="Celular/Whatsapp" name="ClientMobile" />
            </FormElement>
        </BaseCard>
    )
}

export default ClientData
