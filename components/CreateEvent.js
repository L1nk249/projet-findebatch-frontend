import styles from "../styles/CreateEvent.module.css";
import { useEffect, useState } from "react";
import EventCard from "../components/EventCard";
import { Autocomplete, TextField, Checkbox, Chip } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";

function CreateEvent() {
  // en attendant de pouvoir me connecter je crée un faux token pour l'user
  const token = "66b32b5e5b203b9e0fd46b74";

  // Je crée un état par input
  const [eventName, setEventName] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [categories, setCategories] = useState([]);
  const [price, setPrice] = useState("");
  const [address, setAddress] = useState("");
  const [cp, setCp] = useState("");
  const [city, setCity] = useState("");
  const [namePlace, setNamePlace] = useState("");
  const [idPlace, setIdPlace] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");

  // Pour l'instant on utilise une variable pour "catégories".
  // Si on fini le projet + tôt on mettra les catégories dans une BDD dans MongoDB
  const categoriesList = [
    {
      category: "Nature et plein air",
      subcategories: [
        "Randonnée",
        "Camping",
        "Balades à vélo",
        "Sports nautiques (kayak, canoë, etc.)",
        "Jardinage et botanique",
      ],
    },
    {
      category: "Culture et patrimoine",
      subcategories: [
        "Musées",
        "Visites de monuments historiques",
        "Galeries d'art",
        "Spectacles et théâtres",
        "Visites guidées",
      ],
    },
    {
      category: "Divertissement",
      subcategories: [
        "Cinéma",
        "Parcs d'attractions",
        "Zoos et aquariums",
        "Salles de jeux (bowling, billard, etc.)",
        "Concerts et festivals",
      ],
    },
    {
      category: "Sports et activités physiques",
      subcategories: [
        "Gymnases et centres de fitness",
        "Sports d'équipe (football, basketball, etc.)",
        "Sports individuels (tennis, golf, etc.)",
        "Yoga et pilates",
        "Escalade et sports d'aventure",
      ],
    },
    {
      category: "Cuisine et gastronomie",
      subcategories: [
        "Restaurants et cafés",
        "Cours de cuisine",
        "Dégustations de vin et de fromage",
        "Marchés locaux",
        "Food trucks et stands de rue",
      ],
    },
    {
      category: "Détente et bien-être",
      subcategories: [
        "Spas et centres de bien-être",
        "Massages et soins du corps",
        "Méditation et yoga",
        "Thermalisme et bains",
        "Salles de relaxation et de méditation",
      ],
    },
    {
      category: "Événements et festivals",
      subcategories: [
        "Carnavals et fêtes populaires",
        "Salons et foires",
        "Événements sportifs",
        "Fêtes traditionnelles et célébrations",
        "Marchés de Noël et événements saisonniers",
      ],
    },
    {
      category: "Éducation et apprentissage",
      subcategories: [
        "Ateliers et cours",
        "Conférences et débats",
        "Visites éducatives",
        "Clubs et groupes d'intérêt",
        "Cours en ligne et webinaires",
      ],
    },
    {
      category: "Famille et enfants",
      subcategories: [
        "Parcs pour enfants",
        "Ateliers créatifs",
        "Spectacles pour enfants",
        "Activités éducatives en famille",
        "Zoos et aquariums",
      ],
    },
    {
      category: "Voyages et excursions",
      subcategories: [
        "Visites guidées",
        "Croisières et excursions en bateau",
        "Escapades week-end",
        "Voyages culturels",
        "Aventures en plein air",
      ],
    },
  ];

  console.log(latitude);

  // je paramètre le module material-UI
  // 1- J'utilise les icones de ce module (les cases de selection et la flèche)
  const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
  const checkedIcon = <CheckBoxIcon fontSize="small" />;
  // 2- Je crée un état qui est un tableau qui va stocker sous forme d'objet
  // chaque cateogie selectionnée, avec la première propriété qui est "category"
  // la seconde propriété de l'objet est "subcategory"
  const [categoriesSelected, setCategoriesSelected] = useState([]);
  // 3- La fonction handleChange se lance quand je selectionne des categories
  //  value : un tableau des options sélectionnées par l'utilisateur.
  const handleChange = (event, value) => {
    //  Si le nombre d'éléments sélectionnés est supérieur à 3 la fonction s'arrête
    if (value.length <= 3) {
      // je mets à jour les values selectionnées dans categoriesSelected
      setCategoriesSelected(value);
      const subcategories = value.map((cat) => cat.subcategory);
      // je garde seulement la valeur de la sous-categorie, qui est celle qui m'interesse pour mes routes
      setCategories(subcategories);
    }
  };

  const options = categoriesList.flatMap((category) =>
    category.subcategories.map((subcategory) => ({
      category: category.category,
      subcategory,
      // options contient les options à afficher dans l'Autocomplete.
      // flatMap transforme `categoriesList` en un tableau plat d'objets.
      // Pour chaque catégorie, il applique la fonction passée en argument, qui retourne un tableau d'objets.
      // map parcourt chaque sous-catégorie de la catégorie actuelle.
      // Pour chaque sous-catégorie, il retourne un objet contenant category et subcategory
    }))
  );

  const [placeDataBase, setPlaceDataBase] = useState("");

  // je traite l'élément "place"
  useEffect(() => {
    // 1- je fetch pour récupérer les données de la BDD places
    fetch(`http://localhost:3000/places/`)
      .then((response) => response.json())
      .then((data) => {
        //console.log('data' ,data)
        setPlaceDataBase(data.places);
      });
  }, [idPlace]);

  const namePlaceChange = (event, newValue) => {
    // newValue : la valeur sélectionnée par l'utilisateur ou saisie manuellement.
    if (typeof newValue === "string") {
      // if l'utilisateur a saisie lui-même une valeur (alors newValue est du type string)
      // dans ce cas, le champ namePlace prend la valeur saisie et les autres restent vides
      setNamePlace(newValue);
      setAddress("");
      setCp("");
      setCity("");
      setIdPlace(""); // si l'utilisateur saisie lui-même sa place, alors il n'y a pas encore d'id
    } else {
      // if l'utilisateur a sélectionné une suggestion existante
      setNamePlace(newValue?.namePlace || "");
      setAddress(newValue?.address || "");
      setCp(newValue?.cp || "");
      setCity(newValue?.city || "");
      setIdPlace(newValue?._id || ""); // je récupère l'id de la place
    }
  };

  //console.log("placeDataBase", placeDataBase);
  const pictures = ["/IZI_sorties_home.png"];

  // Pour finir, quand je clique sur "soumettre", la fonction addNewEvent se lance.
  // On verifie que tous les champs sont remplis sinon on met une alerte
  // Si tous les champs sont remplis :
  // Si la place n'est pas dans ma BDD, je commence par la créer pour récupérer son id, sa longitude et sa latitude
  // Puis on lance la route qui crée l'event avec les infos du form, le token de l'user, et l'id de la place
  const addNewEvent = async () => {
    // 1- je commence par créer ma place si elle n'est pas dans ma BDD
    if (
      eventName &&
      description &&
      startDate &&
      endDate &&
      startTime &&
      endTime &&
      categories.length > 0 &&
      price &&
      address &&
      cp &&
      city &&
      namePlace
    ) {
      if (!idPlace) {
        // si idPlace est vide alors je créé cette place dans ma BDD
        // dabord je récupère la longitude et la latitude de la place
        let q = address.split(" ").join("+");

        const responseAPI = await fetch(
          `https://api-adresse.data.gouv.fr/search/?q=${q}&postcode=${cp}`
        );
        const dataAPI = await responseAPI.json();

        setLatitude(dataAPI.features[0].geometry.coordinates[1]);
        setLongitude(dataAPI.features[0].geometry.coordinates[0]);

        // une fois que j'ai récupéré longitude et latitude, je rentre la place dans ma BDD
        const responseAddPlace = await fetch(`http://localhost:3000/places`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            namePlace: namePlace,
            address: address,
            cp: cp,
            city: city,
            latitude: dataAPI.features[0].geometry.coordinates[1],
            longitude: dataAPI.features[0].geometry.coordinates[0],
          }),
        });

        const dataPlace = await responseAddPlace.json();
        setIdPlace(dataPlace.result._id);
        addEvent(dataPlace.result._id);
      } else {
        addEvent(idPlace);
      }
    } else {
      console.log("on alerte que tous les champs ne sont pas saisis");
    }
  };

  const addEvent = (placeId) => {
    console.log("la fonction addEvent a demarré");
    console.log("placeId", placeId);
    // 2- je crée mon event
    if (
      eventName &&
      description &&
      startDate &&
      endDate &&
      startTime &&
      endTime &&
      categories &&
      price &&
      placeId
    ) {
      fetch(`http://localhost:3000/events`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          eventName: eventName,
          startTime: startTime,
          endTime: endTime,
          startDate: startDate,
          endDate: endDate,
          placeId: placeId,
          pictures: ["jai pas de photo pour linstant"],
          description: description,
          price: price,
          categories: categories,
          nbLike: [],
          nbBooking: [],
          token: token,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          
          // lancer la route pu de places pour MAJ le tableau "event" dans la coll "places"
          fetch(`http://localhost:3000/places/newevent`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              placeId: placeId,
              eventid: data.result._id,
            }),
          });

          // remettre à zero tous les etats
          setEventName("");
          setDescription("");
          setStartDate(new Date());
          setEndDate(new Date());
          setStartTime("");
          setEndTime("");
          setCategories([]);
          setPrice("");
          setAddress("");
          setCp("");
          setCity("");
          setNamePlace("");
          setIdPlace("");
          setLatitude("");
          setLongitude("");
        });
    }
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.formAndPreviewContainer}>
        <div className={styles.formContainer}>
          <h1>Je créé mon évènement dans IZI</h1>
          <div className={styles.form}>
            <div className={styles.formGroup}>
              <label htmlFor="eventName" className={styles.label}>
                Nom de l'évènement
              </label>
              <input
                required
                placeholder="Concert Mc Solaar au Vélodrome"
                className={styles.input}
                onChange={(e) => setEventName(e.target.value)}
                value={eventName}
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="description" className={styles.label}>
                Description
              </label>
              <input
                required
                placeholder="Ne manquez pas lévénement musical de lannée ! Le légendaire MC Solaar revient sur scène pour un concert exceptionnel au Vélodrome. Préparez-vous à vibrer au rythme des classiques du rap français et des nouveaux titres de cet artiste emblématique. Avec sa poésie urbaine et ses mélodies envoûtantes, MC Solaar vous promet une soirée inoubliable."
                className={styles.input}
                onChange={(e) => setDescription(e.target.value)}
                value={description}
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="startDate" className={styles.label}>
                Date de début de l'évènement
              </label>
              <input
                required
                type="date"
                placeholder="30/08/2024"
                className={styles.input}
                onChange={(e) => setStartDate(e.target.value)}
                value={startDate}
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="endDate" className={styles.label}>
                Date de fin de l'évènement
              </label>
              <input
                required
                type="date"
                placeholder="30/08/2024"
                className={styles.input}
                onChange={(e) => setEndDate(e.target.value)}
                value={endDate}
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="startTime" className={styles.label}>
                Heure de début de l'évènement
              </label>
              <input
                required
                type="time"
                placeholder="30/08/2024"
                className={styles.input}
                onChange={(e) => setStartTime(e.target.value)}
                value={startTime}
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="endTime" className={styles.label}>
                Heure de fin de l'évènement
              </label>
              <input
                required
                type="time"
                placeholder="30/08/2024"
                className={styles.input}
                onChange={(e) => setEndTime(e.target.value)}
                value={endTime}
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="price" className={styles.label}>
                Prix
              </label>
              <input
                required
                placeholder="15€ par personne"
                className={styles.input}
                onChange={(e) => setPrice(e.target.value)}
                value={price}
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="categories" className={styles.label}>
                Categories
              </label>
              {/* pour les catégories je crée l'autocomplete avec le module "material-ui" */}
              <Autocomplete
                multiple
                options={options}
                disableCloseOnSelect
                getOptionLabel={(option) =>
                  `${option.category} - ${option.subcategory}`
                }
                onChange={handleChange}
                value={categoriesSelected}
                // je définie l'input comme étant un choix multiple d'options "category-subcategory"
                // à chaque selection ou changement, la fonction handleChange se lance
                renderOption={(props, option, { selected }) => (
                  <li {...props}>
                    {/* je créé la liste qui sera dans la checkbox */}
                    <Checkbox
                      icon={icon}
                      checkedIcon={checkedIcon}
                      style={{ marginRight: 8 }}
                      checked={selected}
                    />
                    {`${option.category} - ${option.subcategory}`}
                  </li>
                )}
                style={{ width: "100%" }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="outlined"
                    //label="Selectionner les catégories correpondantes (3 maximum)"
                    placeholder="3 categories maximum"
                    className={styles.input}
                    error={categoriesSelected.length === 0}
                  />
                )}
                //ici ce sont les tags (chip) des categ selectionnées
                renderTags={(value, getTagProps) =>
                  value.map((option, index) => (
                    <Chip
                      key={option.subcategory}
                      label={option.subcategory}
                      {...getTagProps({ index })}
                      style={{ backgroundColor: "#2E4656", color: "white" }}
                    />
                  ))
                }
              />
            </div>
            <hr className={styles.hr} />
            <div className={styles.placeForm}>
              <div className={styles.formGroup}>
                <label htmlFor="namePlace" className={styles.label}>
                  Nom du lieu de l'évènement
                </label>
                <Autocomplete
                  // freesolo permet à l'utilisateur de renseigner le champ lui-même s'il ne le trouve pas dans les suggestions
                  freeSolo
                  options={placeDataBase}
                  getOptionLabel={(option) =>
                    typeof option === "string"
                      ? option
                      : `${option.namePlace} - ${option.city}`
                  }
                  onChange={namePlaceChange}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="outlined"
                      placeholder="L'UBU"
                      className={styles.input}
                      value={namePlace}
                      onChange={(e) => setNamePlace(e.target.value)}
                    />
                  )}
                />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="address" className={styles.label}>
                  Adresse du lieu de l'évènement
                </label>
                <input
                  required
                  placeholder="4 avenue de la république"
                  className={styles.input}
                  onChange={(e) => setAddress(e.target.value)}
                  value={address}
                />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="cp" className={styles.label}>
                  Code postal du lieu de l'évènement
                </label>
                <input
                  required
                  placeholder="35000"
                  className={styles.input}
                  onChange={(e) => setCp(e.target.value)}
                  value={cp}
                />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="city" className={styles.label}>
                  Ville du lieu de l'évènement
                </label>
                <input
                  required
                  placeholder="Rennes"
                  className={styles.input}
                  onChange={(e) => setCity(e.target.value)}
                  value={city}
                />
              </div>

              {/* dans les propositions de nom du lieu de l'évent, si aucun choix 
              ne correspond, alors l'utilisateur clique sur "créer mon lieu" 
              ce qui valide la place et la crée dans la BDD */}
            </div>
            <button
              type="submit"
              onClick={() => addNewEvent()}
              className={styles.submitButton}
            >
              Soumettre
            </button>
          </div>
        </div>
        <div className={styles.previewContainer}>
          <EventCard
            pictures={pictures}
            eventName={eventName}
            description={description}
          />
        </div>
      </div>
    </div>
  );
}

export default CreateEvent;
