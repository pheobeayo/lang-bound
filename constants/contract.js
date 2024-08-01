import ProfileABI from "./Profile.json";
import MentorABI from "./Mentor.json";
import LacentBadgeABI from "./LancentBadge.json";
import LaentContentABI from "./LacentContent.json";
import communityABI from "./Community.json";
import postABI from "./Post.json";

const profileAddress = "0xF152B89DddfF08b0dC1D6Cd37A239F7045C81845";
const MentorAddress = "0x2F793feA079FF92C36F6fB9EC5aAE6c7efFA472F";
const LancentBadgeAddress = "0xF152B89DddfF08b0dC1D6Cd37A239F7045C81845";
const LacentContentAddress = "0x39457c1eb66085e539a83E59900eF60B885793fC";
const communityAddress = "0x909Cad763d28c2a8CbbFFCFdC5d282c3dA583182";
const postAddress = "0xD916F8420d4CCeFF69BEFf392533005cB191DF94";

const lacentBadgeAbi = LacentBadgeABI;
const ProfileAbi = ProfileABI;
const MentorAbi = MentorABI;
const LacentContentAbi = LaentContentABI;
const communityAbi = communityABI;
const postAbi = postABI;

export {
  profileAddress,
  ProfileAbi,
  MentorAddress,
  MentorAbi,
  lacentBadgeAbi,
  LancentBadgeAddress,
  LacentContentAddress,
  LacentContentAbi,
  communityAbi,
  communityAddress,
  postAbi,
  postAddress,
};
