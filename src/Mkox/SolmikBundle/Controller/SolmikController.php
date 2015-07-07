<?php

namespace Mkox\SolmikBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;
use Mkox\SolmikBundle\Form;

class SolmikController extends Controller
{
    /**
     * @Route("/solmik/start")
     * @Template()
     */
    public function indexAction() {

//        $objectManager = $this->getServiceLocator()->get('Doctrine\ORM\EntityManager');
//        $repository = $objectManager->getRepository('Solmik\Entity\Category');
//        $categoriesList = $repository->findBy(array(), array('name' => 'ASC'));
        
        $categoriesList = $this->getDoctrine()
            ->getRepository('MkoxSolmikBundle:Category')
            ->findBy(array(), array('name' => 'ASC'));

        $stringForms = array();
//        var_dump($categoriesList);
//        exit();
        for ($i = 0; $i < count($categoriesList); $i++) {

            $solmistrings = $categoriesList[$i]->getSolmistrings();
//            var_dump($solmistrings);
//        exit();
            if ($solmistrings) {

                $stringForms[$i] = array();
                for ($j = 0; $j < count($solmistrings); $j++) {
//var_dump($solmistrings[$j]);
//        exit();
//                    $stringForm = new Form\SolmistringFormForList($objectManager);
//                    $stringForms[$i][] = $stringForm->bind($solmistrings[$j]);
                    
                    $stringForms[$i][] = $this->createForm(new Form\Type\SolmistringForListType(), $solmistrings[$j])->createView();
//                    $stringForms[$i][] = $this->createForm(new Form\Type\SolmistringForListType());
//var_dump($solmistrings[$j]);
//        exit();
                }
            }
        }


//        return $this->render('solmik/index.html.twig', array(
////            'form' => $form->createView(),
//            'categories' => $categoriesList,
//            'stringForms' => $stringForms
//        ));
        return array(
//            'form' => $form->createView(),
            'categories' => $categoriesList,
            'stringForms' => $stringForms
        );
    }
}
