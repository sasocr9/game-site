import ps4Logo from "../assets/logos/playstation-logotype.png";
import xOneLogo from "../assets/logos/xbox-logo.png";
import pcLogo from "../assets/logos/windows-platform-logo.png";
import x360Logo from "../assets/logos/xbox.png";
import nintendo from "../assets/logos/nintendo-switch.png";

const renderPlatform = (platformName) => {
  switch (true) {
    case platformName.includes("PlayStation 4") ||
      platformName.includes("PlayStation 5"):
      return (
        <img src={ps4Logo} alt="PlayStation logo" className="h-8 order-3" />
      );
    case platformName.includes("Xbox One") ||
      platformName.includes("Xbox Series S/X"):
      return <img src={xOneLogo} alt="Xbox logo" className="h-8" />;
    case platformName === "PC":
      return <img src={pcLogo} alt="PC logo" className="h-8 order-1" />;
    case platformName === "Xbox 360":
      return <img src={x360Logo} alt="Xbox 360 logo" className="h-8" />;
    case platformName === "Nintendo Switch":
    case platformName === "Wii":
      return <img src={nintendo} alt="Nintendo Switch logo" className="h-8" />;
    default:
      return null;
  }
};

const PlatformList = ({ platforms }) => {
  // Define the desired order
  const order = [
    "PC",
    "PlayStation 4",
    "Xbox One",
    "Xbox 360",
    "PlayStation 5",
    "Xbox Series S/X",
    "Nintendo Switch",
    "Wii",
  ];

  // Sort platforms according to the defined order
  const sortedPlatforms = platforms
    .filter(({ platform }) => order.includes(platform.name))
    .sort(
      (a, b) => order.indexOf(a.platform.name) - order.indexOf(b.platform.name)
    );

  return (
    <div className="mb-5 flex flex-wrap gap-4">
      {sortedPlatforms.map(({ platform }, index) => (
        <div key={index} className="flex items-center">
          {renderPlatform(platform.name)}
        </div>
      ))}
    </div>
  );
};

export default PlatformList;
