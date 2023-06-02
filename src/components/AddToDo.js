import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { add } from "../store/action";
import { useHistory } from "react-router-dom";

const AddToDo = () => {
  console.log("3");
  const dispatch = useDispatch();
  const data = useSelector((state) => state.todoItems);
  const { todoList, setToDoList } = data;
  const maxId = todoList[0].reduce((prev, current) =>
    prev.id > current.id ? prev : current
  ).id;
  const initialValues = {
    id: maxId + 1,
    userId: "",
    title: "",
    completed: false,
  };
  const history = useHistory();

  function validate(values) {
    const errors = {};
    if (!values.userId) {
      errors.userId = "required!";
    }
    if (!values.title) {
      errors.title = "required!";
    }

    return errors;
  }

  const handleSubmit = (values, actions) => {
    dispatch(add(values));
    history.goBack();
  };

  return (

      <div className="box-content">
        <div className="form-content">
          <Formik
            initialValues={initialValues}
            onSubmit={handleSubmit}
            validate={(values) => validate(values)}
          >
            {({ isSubmitting }) => (
              <Form>
                <div className="form-group">
                  <label className="form-text" htmlFor="id">
                    ID
                  </label>
                  <Field
                    className="form-field text-right"
                    type="number"
                    name="id"
                    disabled
                  />
                  <ErrorMessage className="err" name="id" component="div" />
                </div>
                <div className="form-group">
                  <label className="form-text" htmlFor="userId">
                    UserID:{" "}
                  </label>
                  <Field
                    className="form-field text-right "
                    type="number"
                    name="userId"
                  />
                  <ErrorMessage className="err" name="userId" component="div" />
                </div>
                <div className="form-group">
                  <label className="form-text" htmlFor="title">
                    Title :{" "}
                  </label>
                  <Field className="form-field" type="text" name="title" />
                  <ErrorMessage className="err" name="title" component="div" />
                </div>
                <div className="form-group">
                  <label className="form-text" htmlFor="completed">
                    Completed :{" "}
                  </label>
                  <Field
                    className="form-check"
                    type="checkbox"
                    name="completed"
                  />
                  <ErrorMessage name="completed" />
                  <button
                    className="btn-sub"
                    type="submit"
                    disabled={isSubmitting}
                  >
                    Save
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
  
  );
};
export default AddToDo;
