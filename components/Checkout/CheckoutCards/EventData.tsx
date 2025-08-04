import React from 'react'
import BaseCard from './BaseCard'
import InputField from '@/components/Common/DataInput/InputField'
import SelectInput from '@/components/Common/DataInput/SelectInput'
import FormElement from '@/components/Common/Form/FormElement'
import { EVENT_TYPES } from '@/lib/types'

const EventData = () => {
    const typesKeyValue = Object.entries(EVENT_TYPES).map(([key, value]) => ({
        value: key,
        text: value,
    }))
    return (
        <BaseCard title="Datos del evento">
            <SelectInput
                name="EventType"
                items={typesKeyValue}
                legend="Tipo:"
                label="Selecciona un evento"
            />

            <div className="divider"></div>
            <p className="text-xs pb-4 pt-2 font-extrabold tracking-wide">
                LUGAR DEL EVENTO
            </p>
            <InputField legend="Nombre" name="PlaceName" />
            <InputField legend="Dirección" name="PlaceAddress" />

            <div className="divider"></div>
            <p className="text-xs pb-4 pt-2 font-extrabold tracking-wide">
                FECHA Y HORARIO
            </p>
            <FormElement className="grid grid-cols-2 gap-4">
                <InputField
                    legend="Fecha"
                    type="date"
                    name="EventDate"
                    required={true}
                />
                <InputField
                    legend="Horario "
                    type="time"
                    name="EventTime"
                    required={true}
                />
            </FormElement>
        </BaseCard>
    )
}

export default EventData
