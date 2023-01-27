<?php
session_start();
ini_set("display_errors",true);   //Fehlermeldungen einschalten
require __DIR__ .'/../vendor/autoload.php';

$responseData = Array();


/**
 * Liefert ein Array mit allen Kursen.
 *
 * @return array
 */
function getAllCourses(){
	$stmtKurse = DB::get()->prepare(
		"SELECT id FROM kurs where wirdAngezeigt = 1"
	);
	$stmtKurse->execute();

	$kurse = [];
	foreach($stmtKurse->fetchAll(PDO::FETCH_ASSOC) as $kurs){
		$kurse[] = new Kurs($kurs['id']);
	}
	return $kurse;
}


/**
 * Liefert alle Kurse.
 *
 * GET: api/kurse.php
 */


	foreach(getAllCourses() as $kurs){
		$row = Array();
		$row['id'] = $kurs->getId();
		$row['status'] = $kurs->getStatus();
		$row['statusText'] = $kurs->getStatusText();
		$row['name'] = $kurs->getName();
		$row['beschreibung'] = $kurs->getBeschreibung();
		$row['treffpunkt'] = $kurs->getTreffpunkt();
		$row['preisKurs'] = $kurs->getPreisKurs();
		$row['preisMaterial'] = $kurs->getPreisMaterial();
		$row['vonDatum'] = $kurs->getVonDatum();
		$row['bisDatum'] = $kurs->getBisDatum();
		$row['anzahlPausentage'] = $kurs->getAnzahlPausentage();
		$row['ort'] = $kurs->getOrt();
		$row['land'] = $kurs->getLand();
		$row['fluss'] = $kurs->getFluss();
		$row['kursStufe'] = $kurs->getKursStufe();
		$row['sportArt'] = $kurs->getSportArt();
		$row['typ'] = $kurs->getTyp();
		$row['isShown'] = $kurs->getIsShown();
		$row['guide'] = $kurs->getGuide();
		$row['paddelreiseGruppe'] = $kurs->getPaddelreiseGruppe();
		$row['anmeldeSchluss'] = $kurs->getAnmeldeSchluss();

		array_push($responseData, $row);
	}

	header("Content-type:application/json", true, 200);
	//TODO: delete this in production
	header("Access-Control-Allow-Origin: *");
	echo  json_encode($responseData);

