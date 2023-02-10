import React, { useState } from "react";
import Header from "../components/Header";
import Accueil from "./components/Accueil";

const PageAccueil = () => {
const [showAccueil, setShowAccueil] = useState(false);

return (
<>
<Header setShowAccueil={setShowAccueil} />
{showAccueil && <Accueil />}
</>
);
};

export default PageAccueil;