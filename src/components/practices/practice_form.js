import React from 'react'
import { useFormik } from "formik";
import { APP_COLOUR_2 } from "../../utils/globals.json";


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
    onSubmit: values => {
      alert(JSON.stringify(values, null, 2))
    }
  });

  return (
    <div>
      <h1 className="ctitle">New Practice</h1>
      <form className="cform" onSubmit={formik.handleSubmit}>
        {labels.map((l) => {
          return (
            <label htmlFor={l.name} className="m-2">{l.displayText}
              <input id={l.name} className="m-1 border-2" value={formik.values[l.name]}
                     type="text" name={l.name} onChange={formik.handleChange}/>
            </label>
          )
        })}
        <select className="m-2" id="instrument" name="instrument" value={formik.values.instrument} onChange={formik.handleChange}>
          <option value="drums">Drums</option>
          <option value="guitar">Guitar</option>
        </select>

        <select placeholder="Exercise ID" className="m-2" id="exercise_id" name="exercise_id"
                value={formik.values.exercise_id} onChange={formik.handleChange}>
          <option>Exercise ID</option>
          {[1,2,3].map((i) => {
            return (
              <option value={i}>{i}</option>
            )
          })}
        </select>
        <button className={"cbutton bg-" + APP_COLOUR_2 + "-500 text-white"} type="submit">Submit</button>
      </form>
    </div>
  );
}

export { PracticeForm }
