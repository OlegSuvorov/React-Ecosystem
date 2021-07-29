import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

interface TabPanelProps {
  children: React.ReactNode;
  index: any;
  value: any;
}

const allTabLabels = ['Code', 'Example'];

const TabItem = (props: TabPanelProps) => {
  const { children, value, index } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      style={{
        backgroundColor: '#333',
      }}
    >
      {value === index && (
        <Box p={2}>
          <Typography component="div">{children}</Typography>
        </Box>
      )}
    </div>
  );
};

const allProps = (index: any) => ({
  id: `simple-tab-${index}`,
  'aria-controls': `simple-tabpanel-${index}`,
});

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  indicator: {
    backgroundColor: '#fff',
  },
}));

const TabPanel = ({ children }: { children: React.ReactNode[] | React.ReactNode }) => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  const childrenElements = Array.isArray(children) ? children : [children];
  const tabLabels = allTabLabels.slice(0, childrenElements.length);
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="simple tabs example"
          classes={{ indicator: classes.indicator }}
        >
          {tabLabels.length > 0 &&
            tabLabels.map((tabLabel, index) => (
              <Tab key={tabLabel} label={tabLabel} {...allProps(index)} />
           ))}
        </Tabs>
      </AppBar>
      {childrenElements.map((child: React.ReactNode, index) => (
        <TabItem key={index.toString()} value={value} index={index}>
          {child}
        </TabItem>
      ))}
    </div>
  );
};

export default TabPanel;
