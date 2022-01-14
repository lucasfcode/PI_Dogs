import { useNavigate } from "react-router-dom";
let navigate = useNavigate();

export function goHom() {
  navigate("/home");
}
