export const CONTRACT_ADDRESS =
  "0xd96975013c75a4c737f61bc2ed0875da4417a6efc059db85fae31094f599fd";
export const ABI = [
  {
    type: "impl",
    name: "IQuizImpl",
    interface_name: "quiz_contract::IQuiz",
  },
  {
    type: "struct",
    name: "core::integer::u256",
    members: [
      {
        name: "low",
        type: "core::integer::u128",
      },
      {
        name: "high",
        type: "core::integer::u128",
      },
    ],
  },
  {
    type: "struct",
    name: "quiz_contract::Participant",
    members: [
      {
        name: "id",
        type: "core::starknet::contract_address::ContractAddress",
      },
      {
        name: "total_submissions",
        type: "core::integer::u256",
      },
    ],
  },
  {
    type: "struct",
    name: "quiz_contract::Quiz",
    members: [
      {
        name: "id",
        type: "core::integer::u256",
      },
      {
        name: "title",
        type: "core::felt252",
      },
      {
        name: "description",
        type: "core::felt252",
      },
      {
        name: "total_questions",
        type: "core::integer::u8",
      },
      {
        name: "total_submissions",
        type: "core::integer::u256",
      },
      {
        name: "creator",
        type: "core::starknet::contract_address::ContractAddress",
      },
    ],
  },
  {
    type: "enum",
    name: "core::bool",
    variants: [
      {
        name: "False",
        type: "()",
      },
      {
        name: "True",
        type: "()",
      },
    ],
  },
  {
    type: "struct",
    name: "quiz_contract::QuestionOptionRead",
    members: [
      {
        name: "id",
        type: "core::integer::u8",
      },
      {
        name: "question_id",
        type: "core::integer::u8",
      },
      {
        name: "text",
        type: "core::felt252",
      },
    ],
  },
  {
    type: "struct",
    name: "quiz_contract::QuestionWithOptions",
    members: [
      {
        name: "quiz_id",
        type: "core::integer::u256",
      },
      {
        name: "id",
        type: "core::integer::u8",
      },
      {
        name: "text",
        type: "core::felt252",
      },
      {
        name: "options",
        type: "core::array::Array::<quiz_contract::QuestionOptionRead>",
      },
    ],
  },
  {
    type: "struct",
    name: "quiz_contract::Question",
    members: [
      {
        name: "quiz_id",
        type: "core::integer::u256",
      },
      {
        name: "id",
        type: "core::integer::u8",
      },
      {
        name: "text",
        type: "core::felt252",
      },
      {
        name: "correct_option",
        type: "core::integer::u8",
      },
      {
        name: "options_count",
        type: "core::integer::u8",
      },
    ],
  },
  {
    type: "struct",
    name: "quiz_contract::SubmittedQuiz",
    members: [
      {
        name: "quiz_id",
        type: "core::integer::u256",
      },
      {
        name: "participant",
        type: "core::starknet::contract_address::ContractAddress",
      },
      {
        name: "id",
        type: "core::integer::u256",
      },
      {
        name: "score",
        type: "core::integer::u32",
      },
      {
        name: "total_questions_submitted",
        type: "core::integer::u8",
      },
      {
        name: "current_question",
        type: "core::integer::u8",
      },
    ],
  },
  {
    type: "interface",
    name: "quiz_contract::IQuiz",
    items: [
      {
        type: "function",
        name: "create_participant",
        inputs: [],
        outputs: [],
        state_mutability: "external",
      },
      {
        type: "function",
        name: "get_participant",
        inputs: [
          {
            name: "participantAddress",
            type: "core::starknet::contract_address::ContractAddress",
          },
        ],
        outputs: [
          {
            type: "quiz_contract::Participant",
          },
        ],
        state_mutability: "view",
      },
      {
        type: "function",
        name: "create_quiz",
        inputs: [
          {
            name: "title",
            type: "core::felt252",
          },
          {
            name: "description",
            type: "core::felt252",
          },
        ],
        outputs: [],
        state_mutability: "external",
      },
      {
        type: "function",
        name: "get_quiz",
        inputs: [
          {
            name: "quiz_id",
            type: "core::integer::u256",
          },
        ],
        outputs: [
          {
            type: "quiz_contract::Quiz",
          },
        ],
        state_mutability: "view",
      },
      {
        type: "function",
        name: "create_question",
        inputs: [
          {
            name: "quiz_id",
            type: "core::integer::u256",
          },
          {
            name: "text",
            type: "core::felt252",
          },
          {
            name: "correct_option",
            type: "core::integer::u8",
          },
        ],
        outputs: [],
        state_mutability: "external",
      },
      {
        type: "function",
        name: "create_option",
        inputs: [
          {
            name: "quiz_id",
            type: "core::integer::u256",
          },
          {
            name: "question_id",
            type: "core::integer::u8",
          },
          {
            name: "text",
            type: "core::felt252",
          },
          {
            name: "is_correct",
            type: "core::bool",
          },
          {
            name: "correct_option",
            type: "core::integer::u8",
          },
        ],
        outputs: [],
        state_mutability: "external",
      },
      {
        type: "function",
        name: "get_question",
        inputs: [
          {
            name: "quiz_id",
            type: "core::integer::u256",
          },
          {
            name: "question_id",
            type: "core::integer::u8",
          },
        ],
        outputs: [
          {
            type: "quiz_contract::QuestionWithOptions",
          },
        ],
        state_mutability: "view",
      },
      {
        type: "function",
        name: "get_normal_question",
        inputs: [
          {
            name: "quiz_id",
            type: "core::integer::u256",
          },
          {
            name: "question_id",
            type: "core::integer::u8",
          },
        ],
        outputs: [
          {
            type: "quiz_contract::Question",
          },
        ],
        state_mutability: "view",
      },
      {
        type: "function",
        name: "get_questions",
        inputs: [
          {
            name: "quiz_id",
            type: "core::integer::u256",
          },
        ],
        outputs: [
          {
            type: "core::array::Array::<quiz_contract::QuestionWithOptions>",
          },
        ],
        state_mutability: "view",
      },
      {
        type: "function",
        name: "submit_question",
        inputs: [
          {
            name: "quiz_id",
            type: "core::integer::u256",
          },
          {
            name: "question_id",
            type: "core::integer::u8",
          },
          {
            name: "optionID",
            type: "core::integer::u8",
          },
        ],
        outputs: [],
        state_mutability: "external",
      },
      {
        type: "function",
        name: "mint_submission_nft",
        inputs: [
          {
            name: "submission_id",
            type: "core::integer::u256",
          },
        ],
        outputs: [],
        state_mutability: "external",
      },
      {
        type: "function",
        name: "get_participant_submissions",
        inputs: [
          {
            name: "participantAddress",
            type: "core::starknet::contract_address::ContractAddress",
          },
        ],
        outputs: [
          {
            type: "core::array::Array::<quiz_contract::SubmittedQuiz>",
          },
        ],
        state_mutability: "view",
      },
      {
        type: "function",
        name: "get_submission",
        inputs: [
          {
            name: "submissionID",
            type: "core::integer::u256",
          },
        ],
        outputs: [
          {
            type: "quiz_contract::SubmittedQuiz",
          },
        ],
        state_mutability: "view",
      },
      {
        type: "function",
        name: "get_total_submissions",
        inputs: [],
        outputs: [
          {
            type: "core::integer::u256",
          },
        ],
        state_mutability: "view",
      },
    ],
  },
  {
    type: "impl",
    name: "UpgradeableContract",
    interface_name: "quiz_contract::upgrade::IUpgradeableContract",
  },
  {
    type: "interface",
    name: "quiz_contract::upgrade::IUpgradeableContract",
    items: [
      {
        type: "function",
        name: "upgrade",
        inputs: [
          {
            name: "impl_hash",
            type: "core::starknet::class_hash::ClassHash",
          },
        ],
        outputs: [],
        state_mutability: "external",
      },
    ],
  },
  {
    type: "impl",
    name: "ERC721MixinImpl",
    interface_name: "openzeppelin::token::erc721::interface::ERC721ABI",
  },
  {
    type: "struct",
    name: "core::array::Span::<core::felt252>",
    members: [
      {
        name: "snapshot",
        type: "@core::array::Array::<core::felt252>",
      },
    ],
  },
  {
    type: "struct",
    name: "core::byte_array::ByteArray",
    members: [
      {
        name: "data",
        type: "core::array::Array::<core::bytes_31::bytes31>",
      },
      {
        name: "pending_word",
        type: "core::felt252",
      },
      {
        name: "pending_word_len",
        type: "core::integer::u32",
      },
    ],
  },
  {
    type: "interface",
    name: "openzeppelin::token::erc721::interface::ERC721ABI",
    items: [
      {
        type: "function",
        name: "balance_of",
        inputs: [
          {
            name: "account",
            type: "core::starknet::contract_address::ContractAddress",
          },
        ],
        outputs: [
          {
            type: "core::integer::u256",
          },
        ],
        state_mutability: "view",
      },
      {
        type: "function",
        name: "owner_of",
        inputs: [
          {
            name: "token_id",
            type: "core::integer::u256",
          },
        ],
        outputs: [
          {
            type: "core::starknet::contract_address::ContractAddress",
          },
        ],
        state_mutability: "view",
      },
      {
        type: "function",
        name: "safe_transfer_from",
        inputs: [
          {
            name: "from",
            type: "core::starknet::contract_address::ContractAddress",
          },
          {
            name: "to",
            type: "core::starknet::contract_address::ContractAddress",
          },
          {
            name: "token_id",
            type: "core::integer::u256",
          },
          {
            name: "data",
            type: "core::array::Span::<core::felt252>",
          },
        ],
        outputs: [],
        state_mutability: "external",
      },
      {
        type: "function",
        name: "transfer_from",
        inputs: [
          {
            name: "from",
            type: "core::starknet::contract_address::ContractAddress",
          },
          {
            name: "to",
            type: "core::starknet::contract_address::ContractAddress",
          },
          {
            name: "token_id",
            type: "core::integer::u256",
          },
        ],
        outputs: [],
        state_mutability: "external",
      },
      {
        type: "function",
        name: "approve",
        inputs: [
          {
            name: "to",
            type: "core::starknet::contract_address::ContractAddress",
          },
          {
            name: "token_id",
            type: "core::integer::u256",
          },
        ],
        outputs: [],
        state_mutability: "external",
      },
      {
        type: "function",
        name: "set_approval_for_all",
        inputs: [
          {
            name: "operator",
            type: "core::starknet::contract_address::ContractAddress",
          },
          {
            name: "approved",
            type: "core::bool",
          },
        ],
        outputs: [],
        state_mutability: "external",
      },
      {
        type: "function",
        name: "get_approved",
        inputs: [
          {
            name: "token_id",
            type: "core::integer::u256",
          },
        ],
        outputs: [
          {
            type: "core::starknet::contract_address::ContractAddress",
          },
        ],
        state_mutability: "view",
      },
      {
        type: "function",
        name: "is_approved_for_all",
        inputs: [
          {
            name: "owner",
            type: "core::starknet::contract_address::ContractAddress",
          },
          {
            name: "operator",
            type: "core::starknet::contract_address::ContractAddress",
          },
        ],
        outputs: [
          {
            type: "core::bool",
          },
        ],
        state_mutability: "view",
      },
      {
        type: "function",
        name: "supports_interface",
        inputs: [
          {
            name: "interface_id",
            type: "core::felt252",
          },
        ],
        outputs: [
          {
            type: "core::bool",
          },
        ],
        state_mutability: "view",
      },
      {
        type: "function",
        name: "name",
        inputs: [],
        outputs: [
          {
            type: "core::byte_array::ByteArray",
          },
        ],
        state_mutability: "view",
      },
      {
        type: "function",
        name: "symbol",
        inputs: [],
        outputs: [
          {
            type: "core::byte_array::ByteArray",
          },
        ],
        state_mutability: "view",
      },
      {
        type: "function",
        name: "token_uri",
        inputs: [
          {
            name: "token_id",
            type: "core::integer::u256",
          },
        ],
        outputs: [
          {
            type: "core::byte_array::ByteArray",
          },
        ],
        state_mutability: "view",
      },
      {
        type: "function",
        name: "balanceOf",
        inputs: [
          {
            name: "account",
            type: "core::starknet::contract_address::ContractAddress",
          },
        ],
        outputs: [
          {
            type: "core::integer::u256",
          },
        ],
        state_mutability: "view",
      },
      {
        type: "function",
        name: "ownerOf",
        inputs: [
          {
            name: "tokenId",
            type: "core::integer::u256",
          },
        ],
        outputs: [
          {
            type: "core::starknet::contract_address::ContractAddress",
          },
        ],
        state_mutability: "view",
      },
      {
        type: "function",
        name: "safeTransferFrom",
        inputs: [
          {
            name: "from",
            type: "core::starknet::contract_address::ContractAddress",
          },
          {
            name: "to",
            type: "core::starknet::contract_address::ContractAddress",
          },
          {
            name: "tokenId",
            type: "core::integer::u256",
          },
          {
            name: "data",
            type: "core::array::Span::<core::felt252>",
          },
        ],
        outputs: [],
        state_mutability: "external",
      },
      {
        type: "function",
        name: "transferFrom",
        inputs: [
          {
            name: "from",
            type: "core::starknet::contract_address::ContractAddress",
          },
          {
            name: "to",
            type: "core::starknet::contract_address::ContractAddress",
          },
          {
            name: "tokenId",
            type: "core::integer::u256",
          },
        ],
        outputs: [],
        state_mutability: "external",
      },
      {
        type: "function",
        name: "setApprovalForAll",
        inputs: [
          {
            name: "operator",
            type: "core::starknet::contract_address::ContractAddress",
          },
          {
            name: "approved",
            type: "core::bool",
          },
        ],
        outputs: [],
        state_mutability: "external",
      },
      {
        type: "function",
        name: "getApproved",
        inputs: [
          {
            name: "tokenId",
            type: "core::integer::u256",
          },
        ],
        outputs: [
          {
            type: "core::starknet::contract_address::ContractAddress",
          },
        ],
        state_mutability: "view",
      },
      {
        type: "function",
        name: "isApprovedForAll",
        inputs: [
          {
            name: "owner",
            type: "core::starknet::contract_address::ContractAddress",
          },
          {
            name: "operator",
            type: "core::starknet::contract_address::ContractAddress",
          },
        ],
        outputs: [
          {
            type: "core::bool",
          },
        ],
        state_mutability: "view",
      },
      {
        type: "function",
        name: "tokenURI",
        inputs: [
          {
            name: "tokenId",
            type: "core::integer::u256",
          },
        ],
        outputs: [
          {
            type: "core::byte_array::ByteArray",
          },
        ],
        state_mutability: "view",
      },
    ],
  },
  {
    type: "event",
    name: "openzeppelin::token::erc721::erc721::ERC721Component::Transfer",
    kind: "struct",
    members: [
      {
        name: "from",
        type: "core::starknet::contract_address::ContractAddress",
        kind: "key",
      },
      {
        name: "to",
        type: "core::starknet::contract_address::ContractAddress",
        kind: "key",
      },
      {
        name: "token_id",
        type: "core::integer::u256",
        kind: "key",
      },
    ],
  },
  {
    type: "event",
    name: "openzeppelin::token::erc721::erc721::ERC721Component::Approval",
    kind: "struct",
    members: [
      {
        name: "owner",
        type: "core::starknet::contract_address::ContractAddress",
        kind: "key",
      },
      {
        name: "approved",
        type: "core::starknet::contract_address::ContractAddress",
        kind: "key",
      },
      {
        name: "token_id",
        type: "core::integer::u256",
        kind: "key",
      },
    ],
  },
  {
    type: "event",
    name: "openzeppelin::token::erc721::erc721::ERC721Component::ApprovalForAll",
    kind: "struct",
    members: [
      {
        name: "owner",
        type: "core::starknet::contract_address::ContractAddress",
        kind: "key",
      },
      {
        name: "operator",
        type: "core::starknet::contract_address::ContractAddress",
        kind: "key",
      },
      {
        name: "approved",
        type: "core::bool",
        kind: "data",
      },
    ],
  },
  {
    type: "event",
    name: "openzeppelin::token::erc721::erc721::ERC721Component::Event",
    kind: "enum",
    variants: [
      {
        name: "Transfer",
        type: "openzeppelin::token::erc721::erc721::ERC721Component::Transfer",
        kind: "nested",
      },
      {
        name: "Approval",
        type: "openzeppelin::token::erc721::erc721::ERC721Component::Approval",
        kind: "nested",
      },
      {
        name: "ApprovalForAll",
        type: "openzeppelin::token::erc721::erc721::ERC721Component::ApprovalForAll",
        kind: "nested",
      },
    ],
  },
  {
    type: "event",
    name: "openzeppelin::introspection::src5::SRC5Component::Event",
    kind: "enum",
    variants: [],
  },
  {
    type: "event",
    name: "quiz_contract::QuizContract::Event",
    kind: "enum",
    variants: [
      {
        name: "ERC721Event",
        type: "openzeppelin::token::erc721::erc721::ERC721Component::Event",
        kind: "flat",
      },
      {
        name: "SRC5Event",
        type: "openzeppelin::introspection::src5::SRC5Component::Event",
        kind: "flat",
      },
    ],
  },
];
