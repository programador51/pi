import * as yup from "yup";

const customerName = yup.string().required('Obligatorio').max(15,'Max. 15 letras').trim();

const customerMiddleName = yup
    .string()
    .nullable(true)
    .default(null)
    .max(15,'Max. 15 letras')
    .trim();

const customerPattern = yup.string().required('Obligatorio').max(15,'Max. 15 letras').trim();

const customerMother = yup.string().required('Obligatorio').max(15,'Max. 15 letras').trim();

const customerPhone = yup
    .number()
    .positive('Obligatorio')
    .required('Numero requerido')
    .typeError('Numero invalido')
    .transform((casted,value)=>{
        if(isNaN(casted)) return null;
        if(value.length<10) return null;
        return casted;
    });

const fabricant = yup.string().required('Obligatorio').trim().max(30,'Max. 30 letras');

const model = yup.string().required('Obligatorio').trim().max(30,'Max. 30 letras');

const service = yup.number().positive().required('Obligatorio').typeError('Selecciona un servicio').default(null);

const idUser = yup.number().positive().required('Obligatorio').default(null).typeError('Selecciona un tecnico');

const observations = yup.string().max(50,'Max. 50 letras');

const payMethods = yup.number().positive().required().typeError('Selecciona un metodo de pago').default(null);

const repairStatus = yup.number().positive().default(null).typeError('Selecciona un estado').required();

const total = yup.number().positive().min(1,'Ingresa un monto').typeError('Ingresa un monto valido');

const minDate = new Date();
minDate.setDate(minDate.getDate()-1);

const receptionDate = yup.date().min(minDate,'Fecha invalida').default(new Date())
    .transform((casted,value)=>{
        if(value==='')return minDate;
        return casted
    });

const deliverDate = yup.date().min(minDate,'Fecha invalida').typeError('Selecciona una fecha');

const quotation = yup.number().min(1,'Ingresa un monto').typeError('Ingresa un monto valido');

export const schema = yup.object().shape({
    customerName,
    customerMiddleName,
    customerPattern,
    customerMother,
    customerPhone,
    fabricant,
    model,
    service,
    idUser,
    observations,
    payMethods,
    receptionDate,
    deliverDate,
    repairStatus,
    total,
    quotation
    
});