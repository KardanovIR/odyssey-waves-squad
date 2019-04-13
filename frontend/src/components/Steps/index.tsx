import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Stepper from '@material-ui/core/Stepper'
import Step from '@material-ui/core/Step'
import StepLabel from '@material-ui/core/StepLabel'
import StepContent from '@material-ui/core/StepContent'
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'

const styles = theme => ({
  root: {
    width: '90%',
  },
  button: {
    marginTop: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  actionsContainer: {
    marginBottom: theme.spacing.unit * 2,
  },
  resetContainer: {
    padding: theme.spacing.unit * 3,
  },
})

function getSteps() {
  return ['Basic information', 'Cargo Information', 'Confirmations']
}

function getStepContent(step) {
  switch (step) {
    case 0:
      return 'Create shipment description.'
    case 1:
      return 'An ad group contains one or more ads which target a shared set of keywords.'
    case 2:
      return `Try out different ad text to see what brings in the most customers,
              they're running and how to resolve approval issues.`
    default:
      return 'Unknown step'
  }
}

class VerticalLinearStepper extends React.Component<{ activeStep }> {
  render() {
    const { activeStep } = this.props
    const steps = getSteps()

    return (
      <div style={{ maxWidth: 250 }}>
        <Stepper style={{ backgroundColor: 'transparent', margin: 0, padding: 0 }} activeStep={activeStep} orientation='vertical'>
          {steps.map((label, index) => {
            return (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
                <StepContent>
                  <Typography>{getStepContent(index)}</Typography>
                </StepContent>
              </Step>
            )
          })}
        </Stepper>
        {activeStep === steps.length && (
          <Paper square elevation={0}>
            <Typography>All steps completed - you&apos;re finished</Typography>
            <Button>
              Reset
            </Button>
          </Paper>
        )}
      </div>
    )
  }
}

export default VerticalLinearStepper