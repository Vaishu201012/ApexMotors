import { createContext, useContext, useReducer, useEffect } from "react";
import { initialCars } from "../data/carData";

const InventoryContext = createContext(null);

const STORAGE_KEY = "car-showroom-inventory";

function loadInitial() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : initialCars;
  } catch {
    return initialCars;
  }
}

function inventoryReducer(state, action) {
  switch (action.type) {
    case "ADD_CAR": {
      const newId = state.length ? Math.max(...state.map((c) => c.id)) + 1 : 1;
      return [...state, { ...action.payload, id: newId }];
    }
    case "UPDATE_CAR":
      return state.map((car) =>
        car.id === action.payload.id ? { ...car, ...action.payload } : car
      );
    case "DELETE_CAR":
      return state.filter((car) => car.id !== action.payload.id);
    case "RESET":
      return initialCars;
    default:
      return state;
  }
}

export function InventoryProvider({ children }) {
  const [cars, dispatch] = useReducer(inventoryReducer, loadInitial());

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cars));
  }, [cars]);

  const addCar = (car) => dispatch({ type: "ADD_CAR", payload: car });
  const updateCar = (car) => dispatch({ type: "UPDATE_CAR", payload: car });
  const deleteCar = (id) => dispatch({ type: "DELETE_CAR", payload: { id } });
  const resetInventory = () => dispatch({ type: "RESET" });

  return (
    <InventoryContext.Provider
      value={{ cars, addCar, updateCar, deleteCar, resetInventory }}
    >
      {children}
    </InventoryContext.Provider>
  );
}

export function useInventory() {
  const ctx = useContext(InventoryContext);
  if (!ctx) throw new Error("useInventory must be used within InventoryProvider");
  return ctx;
}
