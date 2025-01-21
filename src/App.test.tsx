import * as React from 'react'
import { render, fireEvent, cleanup } from '@testing-library/react'
import App from './App'
import Modal from './App'

afterEach(cleanup)
describe('testing app component', () => {
  test('renders learn react link', () => {
    const { getByText } = render(<App />)
    const headingElement = getByText('Cost Estimates')
    const navElement = getByText('2. Choose Instance Type')
    expect(navElement).toBeInTheDocument()
    expect(headingElement).toBeInTheDocument()
  })

  test('warning renders if region not selected', () => {
    const { getByText, getAllByText } = render(<App />)
    const btnElements = getAllByText('Select')
    fireEvent.click(btnElements[0])
    const warningElement = getByText('Please select the region first')
    expect(warningElement).toBeInTheDocument()
  })

  test('warning renders if cpu and memory not selected in instance page', () => {
    const { getByText, getAllByText } = render(<App />)
    const regionElement = getByText('Regions')
    fireEvent.click(regionElement)

    const india = getByText('india-1')
    fireEvent.click(india)

    const btnElements = getAllByText('Select')
    fireEvent.click(btnElements[0])

    const submitBtn = getByText('Submit')
    fireEvent.click(submitBtn)

    const warningElement = getByText(
      'Please select Instance Type, Core and Memory'
    )
    expect(warningElement).toBeInTheDocument()
  })

  test('if select button changes to selected', () => {
    const { getByText, getAllByText } = render(<App />)

    const regionElement = getByText('Regions')
    fireEvent.click(regionElement)

    const india = getByText('india-1')
    fireEvent.click(india)

    const indiaBtn = getByText('india-1')
    expect(indiaBtn).toBeInTheDocument()

    const btnElements = getAllByText('Select')
    expect(btnElements).toHaveLength(4)

    fireEvent.click(btnElements[0])

    const navBtn = getByText('1. Choose Image')
    expect(navBtn).toBeInTheDocument()
    fireEvent.click(navBtn)

    const linux = getByText('Linux 2 image')
    expect(linux).toBeInTheDocument()

    const btnElement = getByText('Selected')
    expect(btnElement).toBeInTheDocument()
    expect(btnElement).toBeDisabled()
  })

  test('if modal renders properly', () => {
    const { getByText, getAllByText } = render(<App />)
    const regionElement = getByText('Regions')
    fireEvent.click(regionElement)

    const india = getByText('india-1')
    fireEvent.click(india)

    const indiaBtn = getByText('india-1')
    expect(indiaBtn).toBeInTheDocument()

    const btnElements = getAllByText('Select')
    expect(btnElements).toHaveLength(4)

    fireEvent.click(btnElements[0])

    expect(btnElements[0]).not.toBeInTheDocument()

    const instBtn = getByText('Storage Optimised')
    expect(instBtn).toBeInTheDocument()
    fireEvent.click(instBtn)

    let submitBtn = getByText('Submit')
    expect(submitBtn).toBeInTheDocument()
    fireEvent.click(submitBtn)

    let warning = getByText('Please select Instance Type, Core and Memory')
    expect(warning).toBeInTheDocument()

    let OKBtn = getByText('OK')
    expect(OKBtn).toBeInTheDocument()
    fireEvent.click(OKBtn)

    expect(warning).not.toBeInTheDocument()
    expect(OKBtn).not.toBeInTheDocument()

    const CPUBtn = getByText('CPU Core')
    expect(CPUBtn).toBeInTheDocument()
    fireEvent.click(CPUBtn)

    const Core16Btn = getByText('16 Core')
    expect(Core16Btn).toBeInTheDocument()
    fireEvent.click(Core16Btn)

    expect(Core16Btn).not.toBeInTheDocument()

    submitBtn = getByText('Submit')
    expect(submitBtn).toBeInTheDocument()
    fireEvent.click(submitBtn)

    warning = getByText('Please select Instance Type, Core and Memory')
    expect(warning).toBeInTheDocument()

    OKBtn = getByText('OK')
    expect(OKBtn).toBeInTheDocument()
    fireEvent.click(OKBtn)

    expect(warning).not.toBeInTheDocument()
    expect(OKBtn).not.toBeInTheDocument()

    const MemBtn = getByText('Memory')
    expect(MemBtn).toBeInTheDocument()
    fireEvent.click(MemBtn)

    const Mem64Btn = getByText('64 GB')
    expect(Mem64Btn).toBeInTheDocument()
    fireEvent.click(MemBtn)

    expect(Mem64Btn).not.toBeInTheDocument()

    fireEvent.click(submitBtn)

    const CPUEstimate = getByText('CPU - 16 Core')
    expect(CPUEstimate).toBeInTheDocument()
  })
})
