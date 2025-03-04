import React from 'react';
import { StyleSheet, View, Text, Image, ScrollView } from 'react-native';

export default function DetailsScreen({ route }) {
  const { name } = route.params;

  const contentMap = {
    'General First Aid': renderFirstAid,
    'Snake Bites': renderSnakeBites,
    'Broken Bones': renderBrokenBones,
    'Earthquake': renderEarthquake,
    'Floods': renderFloods,
    'Landslides': renderLandslides,
    'Seizures': renderSeizures,
    'Vehicle Accidents': renderVehicleAccidents,
    'Dog Bites': renderDogBites,
    'Burns': renderBurns,
    'Drowning': renderDrowning,
    'Electric Shock': renderElectricShock,
    'Poisoning': renderPoisoning,
    'Choking': renderChoking,
  };

  const renderContent = contentMap[name] || renderDefault;

  return <ScrollView contentContainerStyle={styles.detailsContainer}>{renderContent()}</ScrollView>;
}

function renderFirstAid() {
  return (
    <View style={styles.sectionContainer}>
      <Image source={require('../../assets/firstaid.jpg')} style={styles.image} />
      <Text style={styles.title}>General Emergency First Aid Tips</Text>
      <Text style={styles.bulletPoint}>• <Text style={styles.boldText}>Check for Safety:</Text> Ensure the area is safe before helping.</Text>
      <Text style={styles.bulletPoint}>• <Text style={styles.boldText}>Call for Help:</Text> Dial emergency services immediately if needed.</Text>
      <Text style={styles.bulletPoint}>• <Text style={styles.boldText}>Stop Bleeding:</Text> Apply firm pressure with a clean cloth.</Text>
      <Text style={styles.bulletPoint}>• <Text style={styles.boldText}>Use of Bandages and Dressings:</Text> Cover wounds with sterile bandages to prevent infection.</Text>
      <Text style={styles.bulletPoint}>• <Text style={styles.boldText}>Apply Antiseptics:</Text> Clean wounds with antiseptic wipes or solutions before dressing.</Text>
      <Text style={styles.bulletPoint}>• <Text style={styles.boldText}>Use Adhesive Bandages:</Text> Small cuts and scrapes can be covered with band-aids to protect from dirt.</Text>
      <Text style={styles.bulletPoint}>• <Text style={styles.boldText}>Tweezers for Splinters:</Text> Use tweezers to carefully remove splinters or debris.</Text>
      <Text style={styles.bulletPoint}>• <Text style={styles.boldText}>Cold Packs for Swelling:</Text> Apply ice packs to reduce swelling and pain.</Text>
      <Text style={styles.bulletPoint}>• <Text style={styles.boldText}>Use Sterile Gloves:</Text> Wear gloves while treating wounds to prevent contamination.</Text>
    </View>
  );
}

function renderSnakeBites() {
  return (
    <View style={styles.sectionContainer}>
      <Image source={require('../../assets/snake.jpg')} style={styles.image} />
      <Text style={styles.title}>Snake Bite First Aid</Text>
      <Text style={styles.bulletPoint}>• <Text style={styles.boldText}>Stay Calm:</Text> Keep still and avoid panic.</Text>
      <Text style={styles.bulletPoint}>• <Text style={styles.boldText}>Move Away:</Text> Do not try to catch or kill the snake.</Text>
      <Text style={styles.bulletPoint}>• <Text style={styles.boldText}>Limit Movement:</Text> Keep the affected limb still and below heart level.</Text>
      <Text style={styles.bulletPoint}>• <Text style={styles.boldText}>Remove Tight Items:</Text> Take off rings, watches, and tight clothing.</Text>
      <Text style={styles.bulletPoint}>• <Text style={styles.boldText}>Seek Medical Help:</Text> Call emergency services or go to a hospital immediately.</Text>
      <Text style={styles.bulletPoint}>• <Text style={styles.boldText}>Keep the Bite Area Clean:</Text> Cover with a clean, dry cloth.</Text>
      <Text style={styles.bulletPoint}>• <Text style={styles.boldText}>Mark the Swelling:</Text> Use a pen to track swelling over time.</Text>
      <Text style={styles.bulletPoint}>• <Text style={styles.boldText}>Avoid Harmful Actions:</Text> Do not apply ice, cut the wound, or suck the venom.</Text>
      <Text style={styles.bulletPoint}>• <Text style={styles.boldText}>Stay Hydrated:</Text> Drink water if possible, but avoid alcohol or caffeine.</Text>
    </View>
  );
}

function renderBrokenBones() {
  return (
    <View style={styles.sectionContainer}>
      <Image source={require('../../assets/bones.jpg')} style={styles.image} />
      <Text style={styles.title}>First Aid for Broken Bones</Text>
      
      <Text style={styles.bulletPoint}>• <Text style={styles.boldText}>Keep Still:</Text> Avoid moving the injured area to prevent further damage.</Text>
      <Text style={styles.bulletPoint}>• <Text style={styles.boldText}>Support the Injury:</Text> Use a splint or padding to keep it stable.</Text>
      <Text style={styles.bulletPoint}>• <Text style={styles.boldText}>Apply Ice:</Text> Wrap ice in a cloth and apply for 15-20 minutes to reduce swelling.</Text>
      <Text style={styles.bulletPoint}>• <Text style={styles.boldText}>Stop Bleeding:</Text> Cover wounds with a clean cloth and apply gentle pressure.</Text>
      <Text style={styles.bulletPoint}>• <Text style={styles.boldText}>Elevate:</Text> Raise the limb above heart level if possible.</Text>
      <Text style={styles.bulletPoint}>• <Text style={styles.boldText}>Seek Help:</Text> Call emergency services or go to a hospital.</Text>
      <Text style={styles.bulletPoint}>• <Text style={styles.boldText}>Do Not Realign:</Text> Never try to push the bone back in place.</Text>
    </View>
  );
}

function renderEarthquake() {
  return (
    <View style={styles.sectionContainer}>
      <Image source={require('../../assets/earthquake.jpg')} style={styles.image} />
      <Text style={styles.title}>Safety Measures During an Earthquake</Text>
      <Text style={styles.bulletPoint}>• <Text style={styles.boldText}>Drop, Cover, and Hold On:</Text> Get down, take cover under sturdy furniture, and hold on until shaking stops.</Text>
      <Text style={styles.bulletPoint}>• <Text style={styles.boldText}>Stay Indoors:</Text> If inside, stay away from windows, glass, and heavy objects.</Text>
      <Text style={styles.bulletPoint}>• <Text style={styles.boldText}>Move to Open Space:</Text> If outside, stay away from buildings, trees, and power lines.</Text>
      <Text style={styles.bulletPoint}>• <Text style={styles.boldText}>Avoid Elevators:</Text> Use stairs instead of elevators in case of structural damage.</Text>
      <Text style={styles.bulletPoint}>• <Text style={styles.boldText}>Be Prepared:</Text> Have an emergency kit with essentials like water, food, flashlight, and first aid supplies.</Text>
      <Text style={styles.bulletPoint}>• <Text style={styles.boldText}>Secure Heavy Objects:</Text> Anchor heavy furniture and appliances to prevent tipping.</Text>
      <Text style={styles.bulletPoint}>• <Text style={styles.boldText}>Check for Gas Leaks:</Text> If you smell gas after an earthquake, turn off the gas supply and leave the area.</Text>
      <Text style={styles.bulletPoint}>• <Text style={styles.boldText}>Expect Aftershocks:</Text> Be ready for potential aftershocks and take necessary precautions.</Text>
    </View>
  );
}

function renderFloods() {
  return (
    <View style={styles.sectionContainer}>
      <Image source={require('../../assets/flood.jpg')} style={styles.image} />
      <Text style={styles.title}>Precautions and Actions During Floods</Text>
      <Text style={styles.bulletPoint}>• <Text style={styles.boldText}>Move to Higher Ground:</Text> Avoid low-lying areas and evacuate if advised.</Text>
      <Text style={styles.bulletPoint}>• <Text style={styles.boldText}>Avoid Floodwaters:</Text> Do not walk or drive through moving water.</Text>
      <Text style={styles.bulletPoint}>• <Text style={styles.boldText}>Turn Off Utilities:</Text> Switch off electricity, gas, and water if flooding is imminent.</Text>
      <Text style={styles.bulletPoint}>• <Text style={styles.boldText}>Have Emergency Supplies:</Text> Keep food, water, first aid, and a flashlight ready.</Text>
      <Text style={styles.bulletPoint}>• <Text style={styles.boldText}>Listen to Authorities:</Text> Follow official instructions for evacuation and safety.</Text>
      <Text style={styles.bulletPoint}>• <Text style={styles.boldText}>Avoid Contaminated Water:</Text> Floodwater may contain sewage, chemicals, and debris.</Text>
      <Text style={styles.bulletPoint}>• <Text style={styles.boldText}>Secure Important Documents:</Text> Store important papers in waterproof containers.</Text>
      <Text style={styles.bulletPoint}>• <Text style={styles.boldText}>Prepare an Evacuation Plan:</Text> Know your area's flood-prone zones and safest routes.</Text>
    </View>
  );
}


function renderLandslides() {
  return (
    <View style={styles.sectionContainer}>
      <Image source={require('../../assets/landslide.jpg')} style={styles.image} />
      <Text style={styles.title}>What to Do in Case of a Landslide</Text>
      <Text style={styles.bulletPoint}>• <Text style={styles.boldText}>Stay Alert:</Text> Listen to weather alerts and evacuation warnings.</Text>
      <Text style={styles.bulletPoint}>• <Text style={styles.boldText}>Move to Higher Ground:</Text> If you are in a landslide-prone area, evacuate immediately.</Text>
      <Text style={styles.bulletPoint}>• <Text style={styles.boldText}>Avoid Steep Slopes:</Text> Stay away from hillsides, cliffs, and areas with loose soil.</Text>
      <Text style={styles.bulletPoint}>• <Text style={styles.boldText}>Watch for Warning Signs:</Text> Look for cracks in the ground, tilting trees, or unusual water flow.</Text>
      <Text style={styles.bulletPoint}>• <Text style={styles.boldText}>Protect Your Head:</Text> If caught in a landslide, curl into a ball and cover your head for protection.</Text>
      <Text style={styles.bulletPoint}>• <Text style={styles.boldText}>Turn Off Utilities:</Text> Shut off gas, electricity, and water to reduce risk of fire or contamination.</Text>
      <Text style={styles.bulletPoint}>• <Text style={styles.boldText}>Help Others:</Text> Assist those in need but avoid putting yourself in danger.</Text>
      <Text style={styles.bulletPoint}>• <Text style={styles.boldText}>Report the Incident:</Text> Inform local authorities about landslides in your area.</Text>
      <Text style={styles.bulletPoint}>• <Text style={styles.boldText}>Stay Informed:</Text> Follow emergency broadcasts for further instructions.</Text>
    </View>
  );
}


function renderDefault() {
  return <Text style={styles.detailsText}>No information available.</Text>;
}

function renderSeizures() {
  return (
    <View style={styles.sectionContainer}>
      <Image source={require('../../assets/seizure.jpg')} style={styles.image} />
      <Text style={styles.title}>First Aid for Seizures</Text>
      <Text style={styles.bulletPoint}>• <Text style={styles.boldText}>Stay Calm:</Text> Keep the person safe and comfortable.</Text>
      <Text style={styles.bulletPoint}>• <Text style={styles.boldText}>Clear the Area:</Text> Remove any harmful objects.</Text>
      <Text style={styles.bulletPoint}>• <Text style={styles.boldText}>Do Not Restrain:</Text> Let the seizure run its course.</Text>
      <Text style={styles.bulletPoint}>• <Text style={styles.boldText}>Turn on Side:</Text> Prevent choking by turning them to the side.</Text>
      <Text style={styles.bulletPoint}>• <Text style={styles.boldText}>Cushion the Head:</Text> Place a soft item under their head to prevent injury.</Text>
      <Text style={styles.bulletPoint}>• <Text style={styles.boldText}>Time the Seizure:</Text> If it lasts more than 5 minutes, seek medical help.</Text>
      <Text style={styles.bulletPoint}>• <Text style={styles.boldText}>Loosen Tight Clothing:</Text> Remove ties or scarves to ease breathing.</Text>
      <Text style={styles.bulletPoint}>• <Text style={styles.boldText}>Stay with the Person:</Text> Reassure them as they regain consciousness.</Text>
      <Text style={styles.bulletPoint}>• <Text style={styles.boldText}>Call for Help:</Text> Seek medical attention if they have repeated seizures or difficulty breathing.</Text>
    </View>
  );
}


function renderVehicleAccidents() {
  return (
    <>
      <View style={styles.sectionContainer}>
        <Image source={require('../../assets/caraccident.jpg')} style={styles.image} />
        <Text style={styles.title}>Car Accident First Aid</Text>
        <Text style={styles.bulletPoint}>• <Text style={styles.boldText}>Ensure Safety:</Text> Move to a safe location if possible.</Text>
        <Text style={styles.bulletPoint}>• <Text style={styles.boldText}>Check for Injuries:</Text> Assess yourself and passengers for injuries.</Text>
        <Text style={styles.bulletPoint}>• <Text style={styles.boldText}>Call Emergency Services:</Text> Dial local emergency numbers for assistance.</Text>
        <Text style={styles.bulletPoint}>• <Text style={styles.boldText}>Apply Basic First Aid:</Text> Stop bleeding with clean cloth, avoid unnecessary movements.</Text>
        <Text style={styles.bulletPoint}>• <Text style={styles.boldText}>Turn on Hazard Lights:</Text> Alert other drivers about the accident.</Text>
        <Text style={styles.bulletPoint}>• <Text style={styles.boldText}>Do Not Move Seriously Injured Victims:</Text> Wait for medical professionals.</Text>
        <Text style={styles.bulletPoint}>• <Text style={styles.boldText}>Exchange Information:</Text> Share contact and insurance details if applicable.</Text>
      </View>
      
      <View style={styles.sectionContainer}>
        <Image source={require('../../assets/bikeaccident.jpg')} style={styles.image} />
        <Text style={styles.title}>Motorbike Accident First Aid</Text>
        <Text style={styles.bulletPoint}>• <Text style={styles.boldText}>Ensure Your Safety:</Text> Move away from traffic if possible.</Text>
        <Text style={styles.bulletPoint}>• <Text style={styles.boldText}>Check for Head Injuries:</Text> Helmets can reduce injury, but still assess for concussion signs.</Text>
        <Text style={styles.bulletPoint}>• <Text style={styles.boldText}>Call for Help:</Text> Contact emergency services immediately.</Text>
        <Text style={styles.bulletPoint}>• <Text style={styles.boldText}>Stop Bleeding:</Text> Use a clean cloth or bandage to control bleeding.</Text>
        <Text style={styles.bulletPoint}>• <Text style={styles.boldText}>Do Not Remove Helmet:</Text> Removing it may worsen spinal injuries; let professionals handle it.</Text>
        <Text style={styles.bulletPoint}>• <Text style={styles.boldText}>Keep the Person Still:</Text> Avoid unnecessary movement to prevent further injury.</Text>
        <Text style={styles.bulletPoint}>• <Text style={styles.boldText}>Monitor Consciousness:</Text> If unconscious, check breathing and pulse.</Text>
      </View>
    </>
  );
}


function renderDogBites() {
  return (
    <View style={styles.sectionContainer}>
      <Image source={require('../../assets/dog.jpg')} style={styles.image} />
      <Text style={styles.title}>Dog Bite First Aid</Text>
      <Text style={styles.bulletPoint}>• <Text style={styles.boldText}>Wash the Wound:</Text> Use soap and running water for at least 5 minutes.</Text>
      <Text style={styles.bulletPoint}>• <Text style={styles.boldText}>Apply Antiseptic:</Text> Use an antiseptic solution or ointment to prevent infection.</Text>
      <Text style={styles.bulletPoint}>• <Text style={styles.boldText}>Control Bleeding:</Text> Press a clean cloth gently over the wound to stop bleeding.</Text>
      <Text style={styles.bulletPoint}>• <Text style={styles.boldText}>Cover with a Bandage:</Text> Use a sterile dressing to protect the wound.</Text>
      <Text style={styles.bulletPoint}>• <Text style={styles.boldText}>Check for Signs of Infection:</Text> Watch for redness, swelling, or pus.</Text>
      <Text style={styles.bulletPoint}>• <Text style={styles.boldText}>Seek Medical Help:</Text> Visit a doctor if the bite is deep, bleeding heavily, or shows infection.</Text>
      <Text style={styles.bulletPoint}>• <Text style={styles.boldText}>Ensure Vaccination:</Text> Confirm if the dog had rabies shots; consider a tetanus or rabies shot if needed.</Text>
    </View>
  );
}


function renderBurns() {
  return (
    <View style={styles.sectionContainer}>
      <Image source={require('../../assets/burn.jpg')} style={styles.image} />
      <Text style={styles.title}>First Aid for Burn Injury</Text>
      <View style={styles.sectionContainer}>
        <Text style={styles.subtitle}>Types of Burns</Text>
        <Text style={styles.bulletPoint}>• <Text style={styles.boldText}>First-Degree Burns:</Text> Affect only the outer layer of skin. Symptoms include redness and mild pain.</Text>
        <Text style={styles.bulletPoint}>• <Text style={styles.boldText}>Second-Degree Burns:</Text> Affect deeper layers of skin, causing blisters and swelling.</Text>
        <Text style={styles.bulletPoint}>• <Text style={styles.boldText}>Third-Degree Burns:</Text> Reach deep tissue, possibly appearing white or charred, and can cause numbness.</Text>
      </View>
      
        <Text style={styles.subtitle}>First Aid Steps</Text>
        <Text style={styles.bulletPoint}>• <Text style={styles.boldText}>Cool the Burn:</Text> Use cool (not ice-cold) water for 10-15 minutes for first- and second-degree burns.</Text>
        <Text style={styles.bulletPoint}>• <Text style={styles.boldText}>Do Not Use Ice:</Text> Ice can worsen the injury.</Text>
        <Text style={styles.bulletPoint}>• <Text style={styles.boldText}>Cover with a Dressing:</Text> Use a non-stick sterile bandage for protection.</Text>
        <Text style={styles.bulletPoint}>• <Text style={styles.boldText}>Remove Tight Items:</Text> Take off rings or tight clothing before swelling starts.</Text>
        <Text style={styles.bulletPoint}>• <Text style={styles.boldText}>Use Pain Relievers:</Text> Take over-the-counter medication if needed.</Text>
        <Text style={styles.bulletPoint}>• <Text style={styles.boldText}>Seek Medical Attention:</Text> If the burn is deep, large, or on sensitive areas like the face or hands.</Text>
    </View>
  );
}

function renderDrowning() {
  return (
    <View style={styles.sectionContainer}>
      <Image source={require('../../assets/drowning.jpg')} style={styles.image} />
      <Text style={styles.title}>Drowning Emergency Response</Text>
      <Text style={styles.bulletPoint}>• <Text style={styles.boldText}>Call for Help:</Text> Shout or Scream for help immediately.</Text>
      <Text style={styles.bulletPoint}>• <Text style={styles.boldText}>Reach, Throw, Don’t Go:</Text> Use a pole, rope, or flotation device instead of jumping in.</Text>
      <Text style={styles.bulletPoint}>• <Text style={styles.boldText}>Get the Person to Safety:</Text> If safe, remove them from the water.</Text>
      <Text style={styles.bulletPoint}>• <Text style={styles.boldText}>Check for Breathing:</Text> If the person is not breathing, start rescue breaths.</Text>
      <Text style={styles.bulletPoint}>• <Text style={styles.boldText}>Perform Chest Compressions:</Text> If no pulse, begin CPR immediately.</Text>
      <Text style={styles.bulletPoint}>• <Text style={styles.boldText}>Keep Them Warm:</Text> Cover with a blanket to prevent hypothermia.</Text>
      <Text style={styles.bulletPoint}>• <Text style={styles.boldText}>Seek Medical Help:</Text> Even if revived, they should be checked by a doctor.</Text>
    </View>
  );
}

function renderElectricShock() {
  return (
    <View style={styles.sectionContainer}>

      <Image source={require('../../assets/shock.jpg')} style={styles.image} />
      <Text style={styles.title}>Electric Shock First Aid</Text>
      <Text style={styles.bulletPoint}>• <Text style={styles.boldText}>Turn Off Power:</Text> If possible, disconnect the source of electricity.</Text>
      <Text style={styles.bulletPoint}>• <Text style={styles.boldText}>Do Not Touch the Person:</Text> Use a non-conductive object like wood to separate them from the source.</Text>
      <Text style={styles.bulletPoint}>• <Text style={styles.boldText}>Call Emergency Services:</Text> Seek immediate medical help.</Text>
      <Text style={styles.bulletPoint}>• <Text style={styles.boldText}>Check for Breathing:</Text> If not breathing, start CPR.</Text>
      <Text style={styles.bulletPoint}>• <Text style={styles.boldText}>Treat Burns:</Text> Cool the affected area with water and cover with a sterile bandage.</Text>
      <Text style={styles.bulletPoint}>• <Text style={styles.boldText}>Monitor for Shock:</Text> Keep the person lying down with legs elevated.</Text>
      <Text style={styles.bulletPoint}>• <Text style={styles.boldText}>Seek Medical Attention:</Text> Even if symptoms seem minor, electrical burns can be serious.</Text>
    </View>
  );
}

function renderPoisoning() {
  return (
    <View style={styles.sectionContainer}>

      <Image source={require('../../assets/poison.jpg')} style={styles.image} />
      <Text style={styles.title}>Poisoning First Aid</Text>
      <Text style={styles.bulletPoint}>• <Text style={styles.boldText}>Identify the Poison:</Text> Look for labels or ask the person what they ingested.</Text>
      <Text style={styles.bulletPoint}>• <Text style={styles.boldText}>Call Emergency Services:</Text> Contact poison control or medical help immediately.</Text>
      <Text style={styles.bulletPoint}>• <Text style={styles.boldText}>Do Not Induce Vomiting:</Text> Unless instructed by a medical professional.</Text>
      <Text style={styles.bulletPoint}>• <Text style={styles.boldText}>Move to Fresh Air:</Text> If inhaled poison, get the person to a well-ventilated area.</Text>
      <Text style={styles.bulletPoint}>• <Text style={styles.boldText}>Wash Skin or Eyes:</Text> If poison is on skin or eyes, rinse thoroughly with water.</Text>
      <Text style={styles.bulletPoint}>• <Text style={styles.boldText}>Keep the Person Calm:</Text> Avoid panic and monitor their condition.</Text>
      <Text style={styles.bulletPoint}>• <Text style={styles.boldText}>Provide Information:</Text> When calling for help, provide details about the poison and the person’s condition.</Text>
    </View>
  );
}

function renderChoking() {
  return (
    <View style={styles.sectionContainer}>

      <Image source={require('../../assets/choke.jpg')} style={styles.image} />
      <Text style={styles.title}>Choking First Aid</Text>    
      <Text style={styles.bulletPoint}>• <Text style={styles.boldText}>Assess the Situation:</Text> If the person can cough or speak, encourage them to keep coughing.</Text>
      <Text style={styles.bulletPoint}>• <Text style={styles.boldText}>Perform the Heimlich Maneuver:</Text> Stand behind the person, place hands above the navel, and deliver quick, upward thrusts.</Text>
      <Text style={styles.bulletPoint}>• <Text style={styles.boldText}>For Infants:</Text> Lay the baby face down on your arm and give five back slaps, then five chest thrusts.</Text>
      <Text style={styles.bulletPoint}>• <Text style={styles.boldText}>Call Emergency Services:</Text> If the object is not dislodged, seek medical help immediately.</Text>
      <Text style={styles.bulletPoint}>• <Text style={styles.boldText}>Do Not Perform Blind Sweeps:</Text> Only remove an object if visible and easily reachable.</Text>
      <Text style={styles.bulletPoint}>• <Text style={styles.boldText}>Monitor the Person:</Text> Even after clearing the airway, watch for difficulty breathing.</Text>
    </View>
  );
}


const styles = StyleSheet.create({
  detailsContainer: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#f8f9fa',
  },
  sectionContainer: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 30,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    color: '#333',
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  detailsText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 10,
    color: '#555',
  },
  bulletPoint: {
    fontSize: 16,
    color: '#444',
    marginVertical: 5,

  },
  boldText: {
    fontWeight: 'bold',
    color: '#222',
  },
  image: {
    width: '100%',
    height: 250,
    resizeMode: 'contain',
    borderRadius: 10,
    marginBottom: 10,
  },
});