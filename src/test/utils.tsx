import { render } from "@testing-library/react";
import { renderHook } from "@testing-library/react-hooks";
import { FC } from "react";
import { ReactElement } from "react";
import { Provider } from "react-redux";
import { createStore } from "redux";
import { rootReducer } from "redux/reducers";
import { State, TemperatureUnit } from "types";

const INITIAL_STATE = {
  temperatureUnit: {
    unit: TemperatureUnit.F,
  },
  weatherData: {
    weatherData: [{dt: 100, temp: {morn: 600, day: 900, night: 650}}],
    temperatureGroupedByDay: {1: [{arg: '90', val: 70}]},
    loading: true,
  },
};

const customRender = (
  ui: ReactElement,
  {
    initialState = INITIAL_STATE,
    store = createStore(rootReducer, initialState),
    ...renderOptions
  }: { initialState?: State; store?: any }
) => {
  const Wrapper: FC = ({ children }): ReactElement => {
    return <Provider store={store}>{children}</Provider>;
  };

  return render(ui, { wrapper: Wrapper, ...renderOptions });
};

function cutomRenderHook<T>(callBack: any) {
  const Wrapper: FC = ({ children }): ReactElement => {
    return (
      <Provider store={createStore(rootReducer, INITIAL_STATE)}>
        {children}
      </Provider>
    );
  };
  return renderHook<T, T>(callBack, { wrapper: Wrapper });
}

export * from "@testing-library/react";

export { customRender as render };

export { cutomRenderHook as renderHook };
