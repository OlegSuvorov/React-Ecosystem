import React, { useState } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { ConcreteFactory1, ConcreteFactory2 } from './implementation';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      marginBottom: theme.spacing(2),
    },
    button: {
      marginBottom: theme.spacing(2),
    },
  }),
);

const InteractiveInstance =
  ({
     addMessage,
     clearAll,
  }: {
    addMessage: Function;
    clearAll: Function;
  }) => {
  const classes = useStyles();
  const [factory1, setFactory1] = useState();
  const [factory2, setFactory2] = useState();
  const [productA1, setProductA1] = useState();
  const [productB1, setProductB1] = useState();
  const [productA2, setProductA2] = useState();
  const [productB2, setProductB2] = useState();

  const handleCreateFactory1 = () => {
    const factory1 = new ConcreteFactory1();
    addMessage('Factory 1 was created!');
    setFactory1(factory1);
  };

  const handleCreateFactory2 = () => {
    const factory2 = new ConcreteFactory2();
    addMessage('Factory 2 was created!');
    setFactory2(factory2);
  };

  const handleCreateProductB1 = () => {
    const productB1 = factory1.createProductB();
    addMessage('Product B1 was created!');
    setProductB1(productB1);
  };

  const handleCreateProductA2 = () => {
    const productA2 = factory2.createProductA();
    addMessage('Product A2 was created!');
    setProductA2(productA2);
  };

  const handleCreateProductB2 = () => {
    const productB2 = factory2.createProductB();
    addMessage('Product B2 was created!');
    setProductB2(productB2);
  };

  const handleCreateProductA1 = () => {
    const productA1 = factory1.createProductA();
    addMessage('Product A1 was created!');
    setProductA1(productA1);
  };

  const handleUseProductA1 = () => {
    addMessage(productA1.usefulFunctionA());
  };

  const handleUseProductA2 = () => {
    addMessage(productA2.usefulFunctionA());
  };

  const handleUseProductB1 = () => {
    addMessage(productB1.usefulFunctionB());
  };

  const handleUseProductB1WithA1 = () => {
    addMessage(productB1.anotherUsefulFunctionB(productA1));
  };

  const handleUseProductB2 = () => {
    addMessage(productB2.usefulFunctionB());
  };

  const handleUseProductB2WithA2 = () => {
    addMessage(productB2.anotherUsefulFunctionB(productA2));
  };

  const handleClearAll = () => {
    setFactory1(null);
    setFactory2(null);
    setProductA1(null);
    setProductA2(null);
    setProductB1(null);
    setProductB2(null);
    clearAll();
  };

  return (
    <div className={classes.root}>
      <Grid item xs={12} sm={12}>
        <Button
          variant="contained"
          onClick={handleCreateFactory1}
          classes={{ root: classes.button }}
          fullWidth
        >
          Create Concrete Factory 1
        </Button>
        {factory1 &&
        <Button
          variant="contained"
          color="primary"
          onClick={handleCreateProductA1}
          classes={{ root: classes.button }}
          fullWidth
        >
          Create Product A1 with ConcreteFactory 1
        </Button>}
        {factory1 &&
        <Button
          variant="contained"
          color="primary"
          onClick={handleCreateProductB1}
          classes={{ root: classes.button }}
          fullWidth
        >
          Create Product B1 with ConcreteFactory 1
        </Button>}
        {productA1 &&
        <Button
          variant="contained"
          color="secondary"
          onClick={handleUseProductA1}
          classes={{ root: classes.button }}
          fullWidth
        >
          Use Product A1
        </Button>}
        {productB1 &&
        <Button
          variant="contained"
          color="secondary"
          onClick={handleUseProductB1}
          classes={{ root: classes.button }}
          fullWidth
        >
          Use Product B1
        </Button>}
        {productA1 && productB1 &&
        <Button
          variant="contained"
          color="secondary"
          onClick={handleUseProductB1WithA1}
          classes={{ root: classes.button }}
          fullWidth
        >
          Use Product B1 with A1
        </Button>}
        <Button
          variant="contained"
          onClick={handleCreateFactory2}
          classes={{ root: classes.button }}
          fullWidth
        >
          Create Concrete Factory 2
        </Button>
        {factory2 &&
        <Button
          variant="contained"
          color="primary"
          onClick={handleCreateProductA2}
          classes={{ root: classes.button }}
          fullWidth
        >
          Create Product A2 with ConcreteFactory 2
        </Button>}
        {factory2 &&
        <Button
          variant="contained"
          color="primary"
          onClick={handleCreateProductB2}
          classes={{ root: classes.button }}
          fullWidth
        >
          Create Product B2 with ConcreteFactory 2
        </Button>}
        {productA2 &&
        <Button
          variant="contained"
          color="secondary"
          onClick={handleUseProductA2}
          classes={{ root: classes.button }}
          fullWidth
        >
          Use Product A2
        </Button>}
        {productB2 &&
        <Button
          variant="contained"
          color="secondary"
          onClick={handleUseProductB2}
          classes={{ root: classes.button }}
          fullWidth
        >
          Use Product B2
        </Button>}
        {productA2 && productB2 &&
        <Button
          variant="contained"
          color="secondary"
          onClick={handleUseProductB2WithA2}
          classes={{ root: classes.button }}
          fullWidth
        >
          Use Product B2 with A2
        </Button>}
        <Button
          variant="contained"
          onClick={handleClearAll}
          classes={{ root: classes.button }}
          fullWidth
        >
          Clear All
        </Button>
      </Grid>
    </div>
  );
};

export default InteractiveInstance;
