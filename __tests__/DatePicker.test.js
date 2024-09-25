import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import DatePicker from '../components/DatePicker';
import useDatePickerStore from '../store/useDatePickerStore';

// Mock Zustand store
jest.mock('../store/useDatePickerStore');

describe('DatePicker Component', () => {
  beforeEach(() => {
    useDatePickerStore.mockReturnValue({
      startDate: new Date(),
      endDate: null,
      recurrencePattern: 'daily',
      recurrenceInterval: 1,
      previewDates: [],
      setStartDate: jest.fn(),
      setEndDate: jest.fn(),
      setRecurrencePattern: jest.fn(),
      setRecurrenceInterval: jest.fn(),
      generatePreviewDates: jest.fn(),
    });
  });

  it('renders DatePicker component correctly', () => {
    render(<DatePicker />);
    expect(screen.getByText(/Recurring Date Picker/i)).toBeInTheDocument();
  });

  it('calls generatePreviewDates when button is clicked', () => {
    const generatePreviewDates = jest.fn();
    useDatePickerStore.mockReturnValue({
      ...useDatePickerStore(),
      generatePreviewDates,
    });

    render(<DatePicker />);
    fireEvent.click(screen.getByText(/Generate Preview/i));
    expect(generatePreviewDates).toHaveBeenCalled();
  });
});
