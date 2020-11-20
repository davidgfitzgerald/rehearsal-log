import React from 'react'
import { useFormik } from "formik";
import { COLOURS } from "../../utils/globals.json";
import * as Yup from 'yup'

const SECONDARY_COLOUR = COLOURS.SECONDARY;
const ERROR_COLOUR = COLOURS.ERROR;

function PracticeForm() {
  const labels = [
    {displayText: "Duration:", name: "duration"},
    {displayText: "BPM:", name: "bpm"},
  ];

  const formik = useFormik({
    initialValues: {
      duration: "",
      instrument: "drums",
      bpm: "",
      exercise_id: null
    },
    validationSchema: Yup.object({
      duration: Yup.number()
        .typeError("Must be a number.")
        .min(1, "Must be greater than zero.")
        .required("Required."),
      instrument: Yup.string()
        .typeError("Must only contain letters.")
        .required("Required."),
      bpm: Yup.number()
        .typeError("Must be a number.")
        .min(1, "Must be greater than zero."),
      exercise_id: Yup.number()
        .typeError("Must be a number")
        .required("Required.")
    }),
    onSubmit: values => {
      alert(JSON.stringify(values, null, 2))
    }
  });

  return (
    <div className="m-10">
      <h1 className="ctitle">New Practice</h1>
      <form className="cform" onSubmit={formik.handleSubmit}>
        {labels.map((l, i) => {
          return (
            <div>
              <label key={i} htmlFor={l.name} className="m-2">{l.displayText}
                <input id={l.name} className="m-1 border-2" value={formik.values[l.name]}
                       type="text" name={l.name} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
              </label>
              {formik.errors[l.name] && formik.touched[l.name] ?
                <div className={"cbutton2 bg-"+ERROR_COLOUR+"-500 text-white"}>
                  {formik.errors[l.name]}
                </div> : null}
            </div>
          )
        })}
        <div>
          <select className="m-2" id="instrument" name="instrument" value={formik.values.instrument}
                  onChange={formik.handleChange} onBlur={formik.handleBlur}>
            <option value="drums">Drums</option>
            <option value="guitar">Guitar</option>
          </select>
          {formik.errors.instrument && formik.touched.instrument ?
            <div className={"cbutton2 bg-"+ERROR_COLOUR+"-500 text-white"}>
              {formik.errors.instrument}
            </div> : null}
        </div>

        <div>
          <select placeholder="Exercise ID" className="m-2" id="exercise_id" name="exercise_id"
                  value={formik.values.exercise_id} onChange={formik.handleChange} onBlur={formik.handleBlur}>
            <option>Exercise ID</option>
            {[1, 2, 3].map((i) => {
              return (
                <option key={i} value={i}>{i}</option>
              )
            })}
          </select>
          {formik.errors.exercise_id && formik.touched.exercise_id ?
            <div className={"cbutton2 bg-"+ERROR_COLOUR+"-500 text-white"}>
              {formik.errors.exercise_id}
            </div> : null}
        </div>
        <button className={"cbutton1 bg-"+SECONDARY_COLOUR+"-500 text-white"} type="submit">Submit</button>
      </form>
    </div>
  );
}

export { PracticeForm }
