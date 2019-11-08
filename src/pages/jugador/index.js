import React from "react";
import ReactDOM from "react-dom";
import styles from "./style.module.scss";
import Button from "../../components/button";
import TextField from "../../components/textField";
import Image from "../../components/image";
import Select from "../../components/select";
import FormControl from "../../components/formControl";
import { Formik, ErrorMessage } from "formik";
import * as yup from "yup";
import {
  createJugador,
  updateJugador,
  deleteJugador
} from "../../services/firebase/api";
import ProgressFile from "../../services/firebase/apiFile";
// Esquema de validacion por medio de yup
const formSchema = yup.object().shape({
  nombre: yup
    .string()
    .min(2)
    .required(),
  apellido: yup
    .string()
    .min(2)
    .required(),
  posicion: yup
    .string()
    .min(1)
    .required(),
  año: yup.number().required(),
  photo: yup.string(),
  file: yup.string().when("photo", {
    is: val => {
      console.log("val", val);
      return val === undefined;
    }, //is: true, // alternatively: (val) => val == true
    then: yup.string().required(),
    otherwise: yup.string().notRequired()
  })
});
class Page extends React.Component {
  //ojo falta probar componente formcONTROL
  state = { showReload: false, upload: false };
  onSubmit = async (values, formikBag) => {
    console.log("valores", values);
    console.log("formikBag", formikBag);
    const { jugador, onClose } = this.props;
    if (jugador.id) {
      await updateJugador(jugador.id, values);
    } else {
      await createJugador(values);
    }
    formikBag.setSubmitting(false);
    onClose();
  };
  componentWillReceiveProps(newProps) {
    const newJugador = newProps.jugador;
    const oldJugador = this.props.jugador;
    if (
      newJugador &&
      oldJugador &&
      (newJugador.nombre !== oldJugador.nombre ||
        newJugador.apellido !== oldJugador.apellido ||
        newJugador.año !== oldJugador.año ||
        newJugador.posicion !== oldJugador.posicion ||
        newJugador.file !== oldJugador.file ||
        newJugador.photo !== oldJugador.photo)
    ) {
      this.setState({ showReload: true });
    }
  }

  onCancel = () => {
    this.props.onClose();
  };
  onDelete = async () => {
    const { jugador, onClose } = this.props;
    await deleteJugador(jugador.id);
    onClose();
  };
  render() {
    const { jugador, onClose } = this.props;
    const { showReload, upload } = this.state;
    const node = (
      <div className={styles.modalContainer}>
        <div className={styles.modalBox}>
          <Formik
            initialValues={{
              nombre: jugador.nombre || "",
              apellido: jugador.apellido || "",
              posicion: jugador.posicion || "",
              año: jugador.año || "",
              file: jugador.file || "",
              photo: jugador.photo || ""
            }}
            validationSchema={formSchema}
            onSubmit={this.onSubmit}
            render={props => {
              const {
                values,
                handleChange,
                handleBlur,
                handleSubmit,
                isSubmitting,
                isValid,
                handleReset,
                setFieldValue
              } = props;
              return (
                <React.Fragment>
                  <FormControl type="row">
                    <Image
                      src={values.photo}
                      onChange={handleChange("photo")}
                      onBlur={handleBlur("photo")}
                      placeholder="Photo"
                      name="photo"
                      width="100px"
                    ></Image>
                    <ErrorMessage name="photo"></ErrorMessage>
                  </FormControl>

                  <FormControl type="row">
                    <TextField
                      value={values.nombre}
                      onChange={handleChange("nombre")}
                      onBlur={handleBlur("nombre")}
                      placeholder="Nombre"
                      name="nombre"
                    ></TextField>
                    <ErrorMessage name="nombre"></ErrorMessage>
                  </FormControl>
                  <FormControl type="row">
                    <TextField
                      value={values.apellido}
                      onChange={handleChange("apellido")}
                      onBlur={handleBlur("apellido")}
                      placeholder="Apellido"
                      name="apellido"
                    ></TextField>
                    <ErrorMessage name="apellido"></ErrorMessage>
                  </FormControl>
                  <FormControl type="block">
                    <Select
                      options={[
                        { label: "2007", value: 2007 },
                        { label: "2006", value: 2006 }
                      ]}
                      value={values.año}
                      onChange={handleChange("año")}
                      onBlur={handleBlur("año")}
                      placeholder="Año"
                      name="año"
                    ></Select>
                    <Select
                      options={[
                        { label: "Defensa", value: "Defensa" },
                        { label: "Delantero", value: "Delantero" }
                      ]}
                      value={values.posicion}
                      onChange={handleChange("posicion")}
                      onBlur={handleBlur("posicion")}
                      placeholder="Posicion"
                      name="posicion"
                    ></Select>
                    <ErrorMessage name="año"></ErrorMessage>
                    <ErrorMessage name="posicion"></ErrorMessage>
                  </FormControl>
                  <FormControl type="row">
                    <TextField
                      id="file"
                      name="file"
                      type="file"
                      onChange={event => {
                        setFieldValue("file", event.currentTarget.files[0]);
                        this.setState({ upload: true });
                      }}
                      onBlur={handleBlur("file")}
                      placeholder="file"
                    ></TextField>
                    <br></br>
                    <ErrorMessage name="file"></ErrorMessage>
                  </FormControl>
                  {upload && (
                    <ProgressFile value={this.state.uploadValue}></ProgressFile>
                  )}
                  <FormControl type="block">
                   </FormControl>
                  <FormControl type="block">
                    <Button
                      onClick={handleSubmit}
                      label={jugador.id ? "Actualizar" : "Crear"}
                      type="regular"
                      disabled={isSubmitting || !isValid}
                    ></Button>
                    {jugador.id && (
                      <Button
                        onClick={this.onDelete}
                        label="Eliminar"
                        type="warning"
                      ></Button>
                    )}
                    <Button
                      onClick={this.onCancel}
                      label="Cancel"
                      type="outline"
                      disabled={false}
                    ></Button>
                  </FormControl>
                  {showReload && (
                    <FormControl type="row">
                      <div>
                        Esta información ha sido actualizada por otro usuario
                        <Button
                          label="click aquí"
                          type="inline"
                          onClick={() => {
                            handleReset();
                            this.setState({ showReload: false });
                          }}
                        ></Button>
                        para actualizar
                      </div>
                    </FormControl>
                  )}
                </React.Fragment>
              );
            }}
          ></Formik>
        </div>
      </div>
    );
    return ReactDOM.createPortal(node, document.getElementById("modal-root"));
  }
}
Page.defaultProps = {
  jugador: {}
};

export default Page;
