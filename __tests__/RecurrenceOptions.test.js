import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import RecurrenceOptions from '../components/RecurrenceOptions';
import useDatePickerStore from '../store/useDatePickerStore';

// Mock Zustand store
jest.mock('../store/useDatePickerStore');

describe('RecurrenceOptions Component', () => {
  beforeEach(() => {
    useDatePickerStore.mockReturnValue({
      recurrencePattern: 'daily',
      setRecurrencePattern: jest.fn(),
      recurrenceInterval: 1,
      setRecurrenceInterval: jest.fn(),
    });
  });

  it('renders recurrence options', () => {
    render(<RecurrenceOptions />);
    expect(screen.getByText(/Recurrence Pattern:/i)).toBeInTheDocument();
    expect(screen.getByDisplayValue(/daily/i)).toBeInTheDocument();
  });

  it('changes recurrence pattern', () => {
    const setRecurrencePattern = jest.fn();
    useDatePickerStore.mockReturnValue({
      recurrencePattern: 'daily',
      setRecurrencePattern,
      recurrenceInterval: 1,
      setRecurrenceInterval: jest.fn(),
    });

    render(<RecurrenceOptions />);
    fireEvent.change(screen.getByDisplayValue(/daily/i), {
      target: { value: 'weekly' },
    });

    expect(setRecurrencePattern).toHaveBeenCalledWith('weekly');
  });

  it('changes recurrence interval', () => {
    const setRecurrenceInterval = jest.fn();
    useDatePickerStore.mockReturnValue({
      recurrencePattern: 'daily',
      setRecurrencePattern: jest.fn(),
      recurrenceInterval: 1,
      setRecurrenceInterval,
    });

    render(<RecurrenceOptions />);
    fireEvent.change(screen.getByDisplayValue('1'), { target: { value: '2' } });
    expect(setRecurrenceInterval).toHaveBeenCalledWith(2);
  });
});
