Java data collection example

This module `languages/java/` now includes a `DataCollector` utility example which uses SQLite (via Xerial sqlite-jdbc) to persist samples and compute basic stats.

Commands:

mvn -f languages/java clean package
java -cp languages/java/target/crypto-tools-0.1.0.jar org.extra.crypto.CryptoApp gen-keys
# For data collector (if implemented as separate class), run your class with java -cp ...

Note: The main Java module already includes encryption CLI; to add the data collector run a dedicated class or extend the CLI.
