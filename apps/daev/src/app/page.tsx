'use client';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from './redux/store';
import { setCliMode } from './redux/uiSlice';
import ConsoleCLI from './views/console/ConsoleCLI';
import Home from './views/Home/Home';

export default function Index() {
  const dispatch: AppDispatch = useDispatch();
  const cliMode = useSelector((state: RootState) => state.ui.cliMode);

  const handleUiChange = (newValue: boolean) => {
    dispatch(setCliMode(newValue));
  };

  return (
    <>
      {cliMode ? (
        <ConsoleCLI onStateChange={handleUiChange} />
      ) : (
        <Home onStateChange={handleUiChange} />
      )}
    </>
  );
}
