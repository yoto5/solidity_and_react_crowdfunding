import { useRef } from 'react';

import Card from '../ui/Card';
import classes from './NewProjectForm.module.css';

function NewProjectForm(props: any) {
  const nameInputRef: any = useRef();
  const descriptionInputRef: any = useRef();
  const targetInputRef: any = useRef();
  const endDateInputRef: any = useRef();
  const typeInputRef: any = useRef();
  const AmountToDonateInputRef: any = useRef();

  function submitHandler(event: any) {
    event.preventDefault();

    const enteredName: any = nameInputRef.current.value;
    const enteredDescription: any = descriptionInputRef.current.value;
    const enteredTargetAmount: any = targetInputRef.current.value;
    const enteredEndDate: any = endDateInputRef.current.value;
    const enteredType: any = typeInputRef.current.value;
    const enteredAmountToDonate: any = AmountToDonateInputRef.current.value;

    const projectData = {
      name: enteredName,
      description: enteredDescription,
      target: enteredTargetAmount,
      endDate: enteredEndDate,
      image: '',
      type: enteredType,
      amountToDonate: enteredAmountToDonate
    };

    props.onAddProject(projectData);
  }

  return (
    <Card>
      <form className={classes.form} onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor='name'>Name</label>
          <input type='text' required id='name' ref={nameInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor='target'>Target Amount (In Eth)</label>
          <input type="number" step="0.000000000000000001" required id='target' ref={targetInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor='end_date'>End Date</label>
          <input type="date" required id='end_date' ref={endDateInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor='type'>Type</label>
          <input type='text' required id='type' ref={typeInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor='amount_to_donate'>Amount To Donate (In Eth)</label>
          <input type="number" step="0.000000000000000001" required id='amount_to_donate' ref={AmountToDonateInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor='description'>Description</label>
          <textarea
            id='description'
            required
            rows = {5}
            ref={descriptionInputRef}
          ></textarea>
        </div>
        <div className={classes.actions}>
          <button>Add Project</button>
        </div>
      </form>
    </Card>
  );
}

export default NewProjectForm;